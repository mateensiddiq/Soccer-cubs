"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export type Membership = {
  subscriptionId: string;
  childName: string;
  locationName: string;
  isFrozen: boolean;
  resumesAtLabel: string | null;
  nextBillingLabel: string | null;
  freezeOneLabel: string | null;
  freezeTwoLabel: string | null;
};

export default function ManageSubscriptionPanel({
  token,
  memberships,
}: {
  token: string;
  memberships: Membership[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function post(url: string, body: object) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error ?? "Something went wrong. Please try again.");
    }
    return data;
  }

  async function handleFreeze(subscriptionId: string, months: 1 | 2) {
    const key = `${subscriptionId}-freeze-${months}`;
    setPending(key);
    setErrors((e) => ({ ...e, [subscriptionId]: "" }));
    try {
      await post("/api/billing/freeze", { token, subscriptionId, months });
      router.refresh();
    } catch (err) {
      setErrors((e) => ({
        ...e,
        [subscriptionId]: err instanceof Error ? err.message : "Something went wrong.",
      }));
    } finally {
      setPending(null);
    }
  }

  async function handleUnfreeze(subscriptionId: string) {
    setPending(`${subscriptionId}-unfreeze`);
    setErrors((e) => ({ ...e, [subscriptionId]: "" }));
    try {
      await post("/api/billing/unfreeze", { token, subscriptionId });
      router.refresh();
    } catch (err) {
      setErrors((e) => ({
        ...e,
        [subscriptionId]: err instanceof Error ? err.message : "Something went wrong.",
      }));
    } finally {
      setPending(null);
    }
  }

  async function handlePortal() {
    setPending("portal");
    setErrors((e) => ({ ...e, portal: "" }));
    try {
      const data = await post("/api/billing/portal-session", { token });
      window.location.href = data.url;
    } catch (err) {
      setPending(null);
      setErrors((e) => ({
        ...e,
        portal: err instanceof Error ? err.message : "Something went wrong.",
      }));
    }
  }

  if (memberships.length === 0) {
    return (
      <div className="bg-white rounded-3xl border-2 border-brown/10 p-8 text-center">
        <p className="font-heading font-bold text-brown">No active memberships found.</p>
        <p className="mt-2 text-sm text-brown-soft">
          If you think this is a mistake, please contact us.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {memberships.map((m) => (
        <div
          key={m.subscriptionId}
          className="bg-white rounded-3xl border-2 border-brown/10 p-6"
        >
          <p className="font-heading font-bold text-lg text-brown">{m.childName}</p>
          <p className="text-sm text-brown-soft">{m.locationName}</p>

          {m.isFrozen ? (
            <div className="mt-4 bg-yellow-soft rounded-2xl p-4">
              <p className="text-sm font-semibold text-brown">
                Frozen — billing resumes {m.resumesAtLabel}.
              </p>
              <Button
                variant="outline"
                className="mt-3 !text-sm !py-2 !px-4"
                disabled={pending === `${m.subscriptionId}-unfreeze`}
                onClick={() => handleUnfreeze(m.subscriptionId)}
              >
                {pending === `${m.subscriptionId}-unfreeze` ? "Unfreezing…" : "Unfreeze Now"}
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              {m.nextBillingLabel && (
                <p className="text-sm text-brown-soft">
                  Next billing date: {m.nextBillingLabel}
                </p>
              )}
              <p className="mt-3 text-sm font-semibold text-brown">Freeze this membership</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="!text-sm !py-2 !px-4"
                  disabled={pending === `${m.subscriptionId}-freeze-1`}
                  onClick={() => handleFreeze(m.subscriptionId, 1)}
                >
                  {pending === `${m.subscriptionId}-freeze-1`
                    ? "Freezing…"
                    : `1 Month${m.freezeOneLabel ? ` (resumes ${m.freezeOneLabel})` : ""}`}
                </Button>
                <Button
                  variant="outline"
                  className="!text-sm !py-2 !px-4"
                  disabled={pending === `${m.subscriptionId}-freeze-2`}
                  onClick={() => handleFreeze(m.subscriptionId, 2)}
                >
                  {pending === `${m.subscriptionId}-freeze-2`
                    ? "Freezing…"
                    : `2 Months${m.freezeTwoLabel ? ` (resumes ${m.freezeTwoLabel})` : ""}`}
                </Button>
              </div>
            </div>
          )}

          {errors[m.subscriptionId] && (
            <p className="mt-2 text-sm text-orange-dark font-semibold">
              {errors[m.subscriptionId]}
            </p>
          )}
        </div>
      ))}

      <div className="text-center">
        <Button variant="ghost" onClick={handlePortal} disabled={pending === "portal"}>
          {pending === "portal" ? "Loading…" : "Update Payment Method or Cancel"}
        </Button>
        {errors.portal && (
          <p className="mt-2 text-sm text-orange-dark font-semibold">{errors.portal}</p>
        )}
      </div>
    </div>
  );
}
