"use client";

import { useState, type FormEvent } from "react";
import { TextField } from "./FormField";
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
      <div className="rounded-3xl bg-green-soft border-2 border-brown/10 p-8 text-center">
        <p className="text-4xl">📬</p>
        <p className="mt-2 font-heading font-bold text-lg text-brown">{message}</p>
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
