"use server";

import {
  VERIFICATION_EMAIL_HTML,
  VERIFICATION_EMAIL_SUBJECT,
} from "@/utils/constants/userEmails";
import config from "@payload-config";
import { getPayload } from "payload";

export default async function sendConfirmationMail({
  email,
}: {
  email: string;
}) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "users",
      showHiddenFields: true,
      where: {
        email: {
          equals: email,
        },
      },
    });

    const foundUser = result.docs[0];
    if (!foundUser) return { success: false, error: "User not found" };
    if (foundUser._verified) {
      return { success: false, error: "User already verified" };
    }

    const foundUserToken = foundUser._verificationToken;
    if (!foundUserToken) {
      return { success: false, error: "Internal token error" };
    }

    const url = `${process.env.BASE_URL}/register?t=${foundUserToken}&u=${email}`;
    await payload.sendEmail({
      to: email,
      subject: VERIFICATION_EMAIL_SUBJECT,
      html: VERIFICATION_EMAIL_HTML({ url, userEmail: email }),
    });

    return { success: true };
  } catch (error) {
    const readableError =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`Resend verification mail failed: ${readableError}`);
    return {
      success: false,
      error: readableError,
    };
  }
}
