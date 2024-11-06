// lib/validation/signupSchema.ts
import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number"),
  fbAccount: z.string().url("Invalid URL").optional(),
  nidNumber: z
    .string()
    .min(1, "NID Number is required")
    .regex(/^\d+$/, "NID Number must be numeric"),
  permanentAddress: z
    .string()
    .min(10, "Permanent address must be at least 10 characters long"),
});

export type MemberFormValues = z.infer<typeof memberSchema>;
