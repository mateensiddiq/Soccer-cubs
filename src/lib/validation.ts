import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(1, "Please enter a message."),
});

export const birthdaySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().optional(),
  eventDate: z.string().trim().optional(),
  message: z.string().trim().min(1, "Tell us a bit about the event."),
});

export const signupChildInfoSchema = z.object({
  locationId: z.string().uuid("Please choose a location."),
  childName: z.string().trim().min(1, "Please enter your child's name."),
  childDob: z.string().trim().min(1, "Please enter your child's date of birth."),
  notes: z.string().trim().optional(),
  parentName: z.string().trim().min(1, "Please enter your name."),
  parentEmail: z.string().trim().email("Please enter a valid email."),
  parentPhone: z.string().trim().min(1, "Please enter a phone number."),
});
