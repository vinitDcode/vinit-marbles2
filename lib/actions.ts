"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { inquirySchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";

export type InquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function submitInquiry(
  _prevState: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    projectDetails: String(formData.get("projectDetails") ?? ""),
  };

  const parsed = inquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("trade_inquiries").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      project_details: parsed.data.projectDetails,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return {
        status: "error",
        message:
          "We couldn't submit your enquiry right now. Please call us directly.",
      };
    }

    return {
      status: "success",
      message:
        "Thank you. Your enquiry has been received - our team will call you shortly.",
    };
  } catch (err) {
    console.error("submitInquiry failed:", err);
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please try again or call us directly.",
    };
  }
}

async function requireAdmin() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function deleteInquiry(id: string) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("trade_inquiries").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/admin");
}
