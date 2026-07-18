"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitInquiry, type InquiryFormState } from "@/lib/actions";
import { inquirySchema } from "@/lib/validations";
import { useEnquiry } from "@/components/providers/enquiry-provider";

const initialState: InquiryFormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto" disabled={pending}>
      {pending ? "Sending..." : "Send Enquiry"}
    </Button>
  );
}

export function InquiryForm() {
  const [state, formAction] = useFormState(submitInquiry, initialState);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    projectDetails: "",
  });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { requestedMaterial, clearRequestedMaterial } = useEnquiry();
  const lastAutoFillRef = useRef("");

  useEffect(() => {
    if (!requestedMaterial) return;
    const prefillLine = `Interested in: ${requestedMaterial}.`;

    setValues((prev) => {
      const isUntouched = !prev.projectDetails.trim() || prev.projectDetails === lastAutoFillRef.current;
      const nextDetails = isUntouched ? prefillLine : `${prev.projectDetails}\n${prefillLine}`;
      lastAutoFillRef.current = nextDetails;
      return { ...prev, projectDetails: nextDetails };
    });

    clearRequestedMaterial();
  }, [requestedMaterial, clearRequestedMaterial]);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setValues({ name: "", phone: "", email: "", projectDetails: "" });
      setClientErrors({});
    }
  }, [state.status]);

  function validateField(field: keyof typeof values, value: string) {
    const result = inquirySchema.safeParse({ ...values, [field]: value });
    setClientErrors((prev) => {
      const next = { ...prev };
      const issue = result.success
        ? undefined
        : result.error.issues.find((i) => i.path[0] === field);
      if (issue) {
        next[field] = issue.message;
      } else {
        delete next[field];
      }
      return next;
    });
  }

  const errors = { ...clientErrors, ...(state.fieldErrors ?? {}) };

  return (
    <section className="relative px-6 py-28 md:px-16" id="enquiry" style={{ scrollMarginTop: "5rem" }}>
      <div className="mx-auto max-w-3xl">
        <p className="overline mb-4 text-center">Get a Quote</p>
        <h2 className="mb-12 text-center font-display text-4xl md:text-5xl">
          Start your <span className="gold-text">project</span>
        </h2>

        <motion.div
          className="stone-ring rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
        <form ref={formRef} action={formAction}>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => {
                  setValues((v) => ({ ...v, name: e.target.value }));
                  validateField("name", e.target.value);
                }}
                error={errors.name}
                placeholder="Your name"
              />
              {errors.name && <FieldError message={errors.name} />}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                inputMode="numeric"
                value={values.phone}
                onChange={(e) => {
                  setValues((v) => ({ ...v, phone: e.target.value }));
                  validateField("phone", e.target.value);
                }}
                error={errors.phone}
                placeholder="98765 43210"
              />
              {errors.phone && <FieldError message={errors.phone} />}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => {
                  setValues((v) => ({ ...v, email: e.target.value }));
                  validateField("email", e.target.value);
                }}
                error={errors.email}
                placeholder="you@email.com"
              />
              {errors.email && <FieldError message={errors.email} />}
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="projectDetails">Project Details</Label>
              <Textarea
                id="projectDetails"
                name="projectDetails"
                value={values.projectDetails}
                onChange={(e) => {
                  setValues((v) => ({ ...v, projectDetails: e.target.value }));
                  validateField("projectDetails", e.target.value);
                }}
                error={errors.projectDetails}
                placeholder="Tell us about your project (e.g., 5,000 sq ft flooring, require Black Galaxy for countertops)..."
              />
              {errors.projectDetails && <FieldError message={errors.projectDetails} />}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <SubmitButton />

            {state.status !== "idle" && (
              <p
                className={`flex items-center gap-2 text-sm ${
                  state.status === "success" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {state.status === "success" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                {state.message}
              </p>
            )}
          </div>
        </form>
        </motion.div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}
