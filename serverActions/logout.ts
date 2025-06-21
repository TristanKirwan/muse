"use server";

import config from "@payload-config";
import { logout } from "@payloadcms/next/auth";

export default async function logoutAction() {
  try {
    const logoutResult = await logout({ config });
    if (!logoutResult.success) {
      throw new Error("Logout was not successful");
    }
    return {
      success: true,
      data: logoutResult.message || "Logged out successfully",
    };
  } catch (error) {
    const readableError =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Logout failed: ${readableError}`);
    return { success: false, error: readableError };
  }
}
