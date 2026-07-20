"use client";

import { useActionState } from "react";
import { submitContactInquiry, type InquiryFormState } from "@/app/actions/inquiries";
import { TextField, TextareaField } from "./FormField";
import { Button } from "./Button";

const initialState: InquiryFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactInquiry,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="rounded-3xl bg-green-soft border-2 border-brown/10 p-8 text-center">
        <p className="text-4xl">⚽</p>
        <p className="mt-2 font-heading font-bold text-xl text-brown">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
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
