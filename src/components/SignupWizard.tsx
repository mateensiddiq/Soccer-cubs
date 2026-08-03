"use client";

import { useMemo, useState } from "react";
import type { PublicLocation, PublicSession } from "@/lib/locations";
import { TextField, TextareaField, SelectField } from "./FormField";
import { Button } from "./Button";

type Step = "location" | "session" | "info" | "review";

type ChildInfo = {
  childName: string;
  childDob: string;
  notes: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
};

const EMPTY_INFO: ChildInfo = {
  childName: "",
  childDob: "",
  notes: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
};

function ageInYears(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const diffMs = Date.now() - birth.getTime();
  return diffMs / (1000 * 60 * 60 * 24 * 365.25);
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

type SessionSelection = { sessionId: string } | { fullYear: true } | null;

export default function SignupWizard({
  locations,
  sessionsByLocation,
  initialLocationId,
}: {
  locations: PublicLocation[];
  sessionsByLocation: Record<string, PublicSession[]>;
  initialLocationId?: string;
}) {
  const [step, setStep] = useState<Step>("location");
  const [locationId, setLocationId] = useState(
    initialLocationId && locations.some((l) => l.id === initialLocationId)
      ? initialLocationId
      : locations[0]?.id ?? ""
  );
  const [sessionSelection, setSessionSelection] = useState<SessionSelection>(null);
  const [info, setInfo] = useState<ChildInfo>(EMPTY_INFO);
  const [quote, setQuote] = useState<{ label: string; priceCents: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedLocation = useMemo(
    () => locations.find((l) => l.id === locationId),
    [locations, locationId]
  );
  const isSessionBased = selectedLocation?.pricing_mode === "sessions";
  const sessionsForLocation = sessionsByLocation[locationId] ?? [];

  const age = ageInYears(info.childDob);
  const ageWarning = age !== null && age < 1.5;

  function goToNextAfterLocation() {
    setSessionSelection(null);
    setStep(isSessionBased ? "session" : "info");
  }

  async function goToReview() {
    setError(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = { locationId };
      if (isSessionBased && sessionSelection) {
        if ("fullYear" in sessionSelection) body.fullYear = true;
        else body.sessionId = sessionSelection.sessionId;
      }

      const res = await fetch("/api/signup/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not load pricing.");
      setQuote(data);
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    setError(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = { locationId, ...info };
      if (isSessionBased && sessionSelection) {
        if ("fullYear" in sessionSelection) body.fullYear = true;
        else body.sessionId = sessionSelection.sessionId;
      }

      const res = await fetch("/api/signup/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not start checkout.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-brown/15 text-center">
        <p className="font-heading font-bold text-lg text-brown">
          No locations available yet
        </p>
        <p className="mt-2 text-sm text-brown-soft">
          Once daycare locations are added, families will be able to sign up
          here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border-2 border-brown/10 shadow-sm p-6 sm:p-10">
      <StepIndicator step={step} includeSession={isSessionBased} />

      {step === "location" && (
        <div className="mt-6 space-y-6">
          <SelectField
            id="location"
            label="Which daycare does your child attend?"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </SelectField>
          {selectedLocation?.address && (
            <p className="text-sm text-brown-soft">{selectedLocation.address}</p>
          )}
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            disabled={!locationId}
            onClick={goToNextAfterLocation}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "session" && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-brown-soft">
            {selectedLocation?.name} runs in sessions. Pick one session, or
            pay once for the full year.
          </p>
          <div className="space-y-3">
            {sessionsForLocation.map((s) => {
              const selected =
                sessionSelection && "sessionId" in sessionSelection
                  ? sessionSelection.sessionId === s.id
                  : false;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSessionSelection({ sessionId: s.id })}
                  className={`w-full text-left rounded-2xl border-2 px-4 py-3 transition-colors ${
                    selected
                      ? "border-orange bg-yellow-soft"
                      : "border-brown/10 hover:border-orange/40"
                  }`}
                >
                  <p className="font-heading font-bold text-brown">{s.name}</p>
                  <p className="text-sm text-brown-soft">
                    {formatDate(s.start_date)} – {formatDate(s.end_date)} &middot;{" "}
                    {s.class_count} classes
                  </p>
                </button>
              );
            })}
            {selectedLocation?.has_full_year_option && (
              <button
                type="button"
                onClick={() => setSessionSelection({ fullYear: true })}
                className={`w-full text-left rounded-2xl border-2 px-4 py-3 transition-colors ${
                  sessionSelection && "fullYear" in sessionSelection
                    ? "border-orange bg-yellow-soft"
                    : "border-brown/10 hover:border-orange/40"
                }`}
              >
                <p className="font-heading font-bold text-brown">Full Year</p>
                <p className="text-sm text-brown-soft">
                  Pay once now to cover all {sessionsForLocation.length} sessions.
                </p>
              </button>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setStep("location")}>
              Back
            </Button>
            <Button
              variant="primary"
              disabled={!sessionSelection}
              onClick={() => setStep("info")}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === "info" && (
        <div className="mt-6 space-y-4">
          <TextField
            id="childName"
            label="Child's name"
            required
            value={info.childName}
            onChange={(e) => setInfo({ ...info, childName: e.target.value })}
          />
          <TextField
            id="childDob"
            type="date"
            label="Child's date of birth"
            required
            value={info.childDob}
            onChange={(e) => setInfo({ ...info, childDob: e.target.value })}
          />
          {ageWarning && (
            <p className="text-sm font-semibold text-orange-dark bg-yellow-soft rounded-xl px-3 py-2">
              Just a heads up — Soccer Cubs is designed for ages 2 and up.
              Reach out on our{" "}
              <a href="/contact" className="underline">
                contact page
              </a>{" "}
              if you have questions about fit.
            </p>
          )}
          <TextareaField
            id="notes"
            label="Anything we should know? (allergies, notes — optional)"
            value={info.notes}
            onChange={(e) => setInfo({ ...info, notes: e.target.value })}
          />
          <div className="pt-2 border-t border-brown/10" />
          <TextField
            id="parentName"
            label="Your name"
            required
            value={info.parentName}
            onChange={(e) => setInfo({ ...info, parentName: e.target.value })}
          />
          <TextField
            id="parentEmail"
            type="email"
            label="Your email"
            required
            value={info.parentEmail}
            onChange={(e) => setInfo({ ...info, parentEmail: e.target.value })}
          />
          <TextField
            id="parentPhone"
            type="tel"
            label="Your phone"
            required
            value={info.parentPhone}
            onChange={(e) => setInfo({ ...info, parentPhone: e.target.value })}
          />

          {error && <p className="text-sm font-semibold text-orange-dark">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setStep(isSessionBased ? "session" : "location")}
            >
              Back
            </Button>
            <Button
              variant="primary"
              disabled={
                loading ||
                !info.childName ||
                !info.childDob ||
                !info.parentName ||
                !info.parentEmail ||
                !info.parentPhone
              }
              onClick={goToReview}
            >
              {loading ? "Loading…" : "See My Price"}
            </Button>
          </div>
        </div>
      )}

      {step === "review" && quote && (
        <div className="mt-6 space-y-6">
          <div className="bg-yellow-soft rounded-3xl p-6 text-center">
            <p className="text-sm font-semibold text-brown-soft">{quote.label}</p>
            <p className="mt-1 font-heading font-extrabold text-4xl text-brown">
              {formatPrice(quote.priceCents)}
              {!isSessionBased && (
                <span className="text-lg font-semibold text-brown-soft">/mo</span>
              )}
            </p>
            <p className="mt-1 text-xs text-brown-soft">
              {isSessionBased
                ? "One-time payment."
                : 'Billed monthly, cancel anytime from "Manage My Subscription."'}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-brown/10 p-5 text-sm space-y-1.5">
            <p>
              <span className="font-semibold">Child:</span> {info.childName} (DOB{" "}
              {info.childDob})
            </p>
            <p>
              <span className="font-semibold">Parent:</span> {info.parentName}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {info.parentEmail} &middot;{" "}
              {info.parentPhone}
            </p>
          </div>

          {error && <p className="text-sm font-semibold text-orange-dark">{error}</p>}

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep("info")}>
              Edit Info
            </Button>
            <Button variant="primary" disabled={loading} onClick={handleCheckout}>
              {loading ? "Redirecting…" : "Confirm & Pay"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step, includeSession }: { step: Step; includeSession: boolean }) {
  const steps: { key: Step; label: string }[] = [
    { key: "location", label: "Location" },
    ...(includeSession ? [{ key: "session" as const, label: "Session" }] : []),
    { key: "info", label: "Your Cub" },
    { key: "review", label: "Pay" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center font-heading font-bold text-sm border-2 ${
                i <= currentIndex
                  ? "bg-orange text-white border-orange"
                  : "bg-white text-brown-soft border-brown/15"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm font-semibold hidden sm:inline ${
                i <= currentIndex ? "text-brown" : "text-brown-soft"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 rounded ${
                i < currentIndex ? "bg-orange" : "bg-brown/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
