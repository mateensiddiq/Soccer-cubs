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
  sessionId: z.string().uuid().optional(),
  fullYear: z.boolean().optional(),
  classGroupId: z.string().uuid().optional(),
  childName: z.string().trim().min(1, "Please enter your child's name."),
  childDob: z.string().trim().min(1, "Please enter your child's date of birth."),
  childAddress: z.string().trim().min(1, "Please enter your address."),
  childCity: z.string().trim().min(1, "Please enter your city."),
  childState: z.string().trim().min(1, "Please enter your state."),
  childZip: z.string().trim().min(1, "Please enter your zip code."),
  notes: z.string().trim().optional(),
  parentName: z.string().trim().min(1, "Please enter your name."),
  parentEmail: z.string().trim().email("Please enter a valid email."),
  parentPhone: z.string().trim().min(1, "Please enter a phone number."),
  parent2Name: z.string().trim().optional(),
  parent2Phone: z.string().trim().optional(),
  emergency1Name: z.string().trim().min(1, "Please enter an emergency contact name."),
  emergency1Phone: z.string().trim().min(1, "Please enter an emergency contact phone."),
  emergency2Name: z.string().trim().optional(),
  emergency2Phone: z.string().trim().optional(),
});
