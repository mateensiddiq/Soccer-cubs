"use client";

import { useState, type FormEvent } from "react";
import { TextField } from "./FormField";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { Button } from "./Button";

export default function BillingRequestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/billing-portal/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(
        data.message ?? data.error ?? "Something went wrong. Please try again."
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setStatus("done");
    }
  }

  if (status === "done" && message) {
    return (
      <div className="rounded-3xl bg-green-soft ring-1 ring-green/30 p-10 text-center" role="status">
        <EnvelopeSimple size={44} weight="duotone" className="mx-auto text-green-deep" aria-hidden="true" />
        <p className="mt-3 font-heading font-bold text-lg text-brown">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        id="billing-email"
        type="email"
        label="The email you used to sign up"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending…" : "Email Me a Link"}
      </Button>
    </form>
  );
}
