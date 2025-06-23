import {
  VERIFICATION_EMAIL_HTML,
  VERIFICATION_EMAIL_SUBJECT,
} from "@/utils/constants/userEmails";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        // Use the token provided to allow your user to verify their account
        const url = `${process.env.BASE_URL}/register?t=${token}&u=${user.email}`;

        return VERIFICATION_EMAIL_HTML({
          url,
          userEmail: user.email,
        });
      },
      generateEmailSubject: () => VERIFICATION_EMAIL_SUBJECT,
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
