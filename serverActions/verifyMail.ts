"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export default async function verifyMail(token: string) {
  if (!token) return { success: false, error: "Token is required" };

  try {
    const payload = await getPayload({ config });
    const result = await payload.verifyEmail({
      collection: "users",
      token: token,
    });

    if (!result) return { success: false, error: "Invalid or expired token" };

    return { success: true };
  } catch (error) {
    const readableError =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Confirming email addres failed: ${readableError}`);
    return {
      success: false,
      error: readableError,
    };
  }
}
