"use client";

import { useMemo, useState } from "react";
import type { PublicLocation, PublicSession, PublicClassGroup } from "@/lib/locations";
import { TextField, TextareaField } from "./FormField";
import { Button } from "./Button";

type Step = "session" | "info" | "review";

type ChildInfo = {
  childName: string;
  childDob: string;
  childAddress: string;
  childCity: string;
  childState: string;
  childZip: string;
  notes: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  parent2Name: string;
  parent2Phone: string;
  emergency1Name: string;
  emergency1Phone: string;
  emergency2Name: string;
  emergency2Phone: string;
};

const EMPTY_INFO: ChildInfo = {
  childName: "",
  childDob: "",
  childAddress: "",
  childCity: "",
  childState: "",
  childZip: "",
  notes: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  parent2Name: "",
  parent2Phone: "",
  emergency1Name: "",
  emergency1Phone: "",
  emergency2Name: "",
  emergency2Phone: "",
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

export default function SchoolSignupForm({
  location,
  classGroups,
  sessions,
}: {
  location: PublicLocation;
  classGroups: PublicClassGroup[];
  sessions: PublicSession[];
}) {
  const isSessionBased = location.pricing_mode === "sessions";
  const [step, setStep] = useState<Step>(isSessionBased ? "session" : "info");
  const [sessionSelection, setSessionSelection] = useState<SessionSelection>(null);
  const [classGroupId, setClassGroupId] = useState<string>(
    classGroups.length === 1 ? classGroups[0].id : ""
  );
  const [info, setInfo] = useState<ChildInfo>(EMPTY_INFO);
  const [quote, setQuote] = useState<{ label: string; priceCents: number; billingNote?: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const needsGroupPicker = classGroups.length > 1;
  const selectedGroup = useMemo(
    () => classGroups.find((g) => g.id === classGroupId),
    [classGroups, classGroupId]
  );

  const age = ageInYears(info.childDob);
  const ageWarning = age !== null && age < 1.5;

  async function goToReview() {
    setError(null);
    setLoading(true);
    try {
      const body: Record<string, unknown> = { locationId: location.id };
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
      const body: Record<string, unknown> = {
        locationId: location.id,
        classGroupId: classGroupId || undefined,
        ...info,
      };
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

  const infoComplete =
    info.childName &&
    info.childDob &&
    info.childAddress &&
    info.childCity &&
    info.childState &&
    info.childZip &&
    info.parentName &&
    info.parentEmail &&
    info.parentPhone &&
    info.emergency1Name &&
    info.emergency1Phone &&
    (!needsGroupPicker || classGroupId);

  return (
    <div className="bg-white rounded-[2rem] border-2 border-brown/10 shadow-sm p-6 sm:p-10">
      <StepIndicator step={step} includeSession={isSessionBased} />

      {step === "session" && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-brown-soft">
            {location.name} runs in sessions. Pick one session, or pay once
            for the full year.
          </p>
          <div className="space-y-3">
            {sessions.map((s) => {
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
            {location.has_full_year_option && (
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
                  Pay once now to cover all {sessions.length} sessions.
                </p>
              </button>
            )}
          </div>

          <div className="flex gap-3 pt-2">
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
        <div className="mt-6 space-y-5">
          <div className="space-y-4">
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
            <TextField
              id="childAddress"
              label="Address"
              required
              value={info.childAddress}
              onChange={(e) => setInfo({ ...info, childAddress: e.target.value })}
            />
            <div className="grid grid-cols-3 gap-3">
              <TextField
                id="childCity"
                label="City"
                required
                value={info.childCity}
                onChange={(e) => setInfo({ ...info, childCity: e.target.value })}
              />
              <TextField
                id="childState"
                label="State"
                required
                value={info.childState}
                onChange={(e) => setInfo({ ...info, childState: e.target.value })}
              />
              <TextField
                id="childZip"
                label="Zip"
                required
                value={info.childZip}
                onChange={(e) => setInfo({ ...info, childZip: e.target.value })}
              />
            </div>
          </div>

          {needsGroupPicker && (
            <div>
              <span className="block mb-1.5 font-semibold text-sm text-brown">
                Which class time?
              </span>
              <div className="space-y-2">
                {classGroups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setClassGroupId(g.id)}
                    className={`w-full text-left rounded-2xl border-2 px-4 py-3 transition-colors ${
                      classGroupId === g.id
                        ? "border-orange bg-yellow-soft"
                        : "border-brown/10 hover:border-orange/40"
                    }`}
                  >
                    <p className="font-heading font-bold text-brown">{g.label}</p>
                    <p className="text-sm text-brown-soft">
                      {[g.age_range, g.time_range].filter(Boolean).join(" · ")}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <TextareaField
            id="notes"
            label="Anything we should know? (allergies, notes — optional)"
            value={info.notes}
            onChange={(e) => setInfo({ ...info, notes: e.target.value })}
          />

          <div className="pt-2 border-t border-brown/10">
            <p className="font-heading font-bold text-brown mb-3">Parent #1</p>
            <div className="space-y-4">
              <TextField
                id="parentName"
                label="Name"
                required
                value={info.parentName}
                onChange={(e) => setInfo({ ...info, parentName: e.target.value })}
              />
              <TextField
                id="parentEmail"
                type="email"
                label="Email"
                required
                value={info.parentEmail}
                onChange={(e) => setInfo({ ...info, parentEmail: e.target.value })}
              />
              <TextField
                id="parentPhone"
                type="tel"
                label="Phone"
                required
                value={info.parentPhone}
                onChange={(e) => setInfo({ ...info, parentPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-brown/10">
            <p className="font-heading font-bold text-brown mb-3">
              Parent #2 <span className="font-normal text-brown-soft">(optional)</span>
            </p>
            <div className="space-y-4">
              <TextField
                id="parent2Name"
                label="Name"
                value={info.parent2Name}
                onChange={(e) => setInfo({ ...info, parent2Name: e.target.value })}
              />
              <TextField
                id="parent2Phone"
                type="tel"
                label="Phone"
                value={info.parent2Phone}
                onChange={(e) => setInfo({ ...info, parent2Phone: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-brown/10">
            <p className="font-heading font-bold text-brown mb-3">
              Emergency Contact #1 <span className="font-normal text-brown-soft">(other than parent)</span>
            </p>
            <div className="space-y-4">
              <TextField
                id="emergency1Name"
                label="Name"
                required
                value={info.emergency1Name}
                onChange={(e) => setInfo({ ...info, emergency1Name: e.target.value })}
              />
              <TextField
                id="emergency1Phone"
                type="tel"
                label="Phone"
                required
                value={info.emergency1Phone}
                onChange={(e) => setInfo({ ...info, emergency1Phone: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-brown/10">
            <p className="font-heading font-bold text-brown mb-3">
              Emergency Contact #2{" "}
              <span className="font-normal text-brown-soft">(other than parent, optional)</span>
            </p>
            <div className="space-y-4">
              <TextField
                id="emergency2Name"
                label="Name"
                value={info.emergency2Name}
                onChange={(e) => setInfo({ ...info, emergency2Name: e.target.value })}
              />
              <TextField
                id="emergency2Phone"
                type="tel"
                label="Phone"
                value={info.emergency2Phone}
                onChange={(e) => setInfo({ ...info, emergency2Phone: e.target.value })}
              />
            </div>
          </div>

          {error && <p className="text-sm font-semibold text-orange-dark">{error}</p>}

          <div className="flex gap-3 pt-2">
            {isSessionBased && (
              <Button variant="ghost" onClick={() => setStep("session")}>
                Back
              </Button>
            )}
            <Button
              variant="primary"
              disabled={loading || !infoComplete}
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
            {quote.billingNote && (
              <p className="mt-2 text-sm font-semibold text-orange-dark bg-white rounded-xl px-3 py-2 inline-block">
                {quote.billingNote}
              </p>
            )}
          </div>

          <div className="rounded-2xl border-2 border-brown/10 p-5 text-sm space-y-1.5">
            <p>
              <span className="font-semibold">Child:</span> {info.childName} (DOB{" "}
              {info.childDob})
            </p>
            {selectedGroup && (
              <p>
                <span className="font-semibold">Class time:</span> {selectedGroup.label}
              </p>
            )}
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
