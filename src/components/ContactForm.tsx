"use client";

import { useActionState } from "react";
import { submitContactInquiry, type InquiryFormState } from "@/app/actions/inquiries";
import { TextField, TextareaField, Honeypot } from "./FormField";
import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "./Button";

const initialState: InquiryFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactInquiry,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="rounded-3xl bg-green-soft ring-1 ring-green/30 p-10 text-center" role="status">
        <CheckCircle size={44} weight="fill" className="mx-auto text-green-deep" aria-hidden="true" />
        <p className="mt-3 font-heading font-bold text-xl text-brown">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <Honeypot />
      <TextField id="name" name="name" label="Your name" required />
      <TextField id="email" name="email" type="email" label="Email" required />
      <TextField id="phone" name="phone" type="tel" label="Phone (optional)" />
      <TextareaField id="message" name="message" label="Message" required />
      {state.status === "error" && (
        <p className="text-sm font-semibold text-orange-dark">{state.message}</p>
      )}
      <Button type="submit" variant="primary" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
