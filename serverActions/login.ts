"use server";

import config from "@payload-config";
import { login } from "@payloadcms/next/auth";

export default async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await login({
      collection: "users",
      config,
      email,
      password,
    });

    return { success: true, data: result.user };
  } catch (error) {
    console.error(
      `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
}
