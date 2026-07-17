import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "That name looks too long."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(150),
  projectDetails: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your project.")
    .max(1000, "Please keep this under 1000 characters."),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const passcodeSchema = z.object({
  passcode: z.string().trim().min(4).max(64),
});
