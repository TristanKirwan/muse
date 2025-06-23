"use server";
import config from "@payload-config";
import { getPayload } from "payload";

export default async function register({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      success: false,
      error:
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.",
    };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format." };
  }

  try {
    const payload = await getPayload({ config });
    const existingDocsWithEmail = await payload.count({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingDocsWithEmail.totalDocs > 0) {
      return { success: false, error: "Email already exists." };
    }

    const createResult = await payload.create({
      collection: "users",
      data: { email, password },
    });

    if (createResult.createdAt) {
      return { success: true, data: createResult };
    }
    return { success: false, error: "User registration failed." };
  } catch (error) {
    const readableError =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Registration failed: ${readableError}`);
    return { success: false, error: readableError };
  }
}
