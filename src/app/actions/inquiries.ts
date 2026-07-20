"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { sendOwnerNotification } from "@/lib/email";
import { contactSchema, birthdaySchema } from "@/lib/validation";
import type { InquiryType } from "@/types/database";

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  return saveInquiry("contact", {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    event_date: null,
    message: parsed.data.message,
  });
}

export async function submitBirthdayInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const parsed = birthdaySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventDate: formData.get("eventDate"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form and try again.",
    };
  }

  return saveInquiry("birthday", {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    event_date: parsed.data.eventDate || null,
    message: parsed.data.message,
  });
}

async function saveInquiry(
  type: InquiryType,
  fields: {
    name: string;
    email: string;
    phone: string | null;
    event_date: string | null;
    message: string;
  }
): Promise<InquiryFormState> {
  try {
    const { error } = await supabaseAdmin()
      .from("inquiries")
      .insert({ type, ...fields });

    if (error) throw error;

    const label = type === "contact" ? "Contact form" : "Birthday/Event inquiry";
    await sendOwnerNotification(
      `${label} — ${fields.name}`,
      `
        <p><strong>Type:</strong> ${label}</p>
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Phone:</strong> ${fields.phone ?? "—"}</p>
        ${fields.event_date ? `<p><strong>Event date:</strong> ${fields.event_date}</p>` : ""}
        <p><strong>Message:</strong><br/>${fields.message.replace(/\n/g, "<br/>")}</p>
      `
    );

    return {
      status: "success",
      message:
        type === "contact"
          ? "Thanks for reaching out! We'll get back to you soon."
          : "Thanks! We'll follow up about your birthday/event soon.",
    };
  } catch (err) {
    console.error("Failed to save inquiry", err);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again in a moment.",
    };
  }
}
