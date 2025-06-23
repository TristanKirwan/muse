import type { IEmailConfirmationFormVariants } from "@/components/Forms/EmailConfirmationForm";
import EmailConfirmationForm from "@/components/Forms/EmailConfirmationForm";
import RegisterForm from "@/components/Forms/RegisterForm";
import verifyMail from "@/serverActions/verifyMail";
import config from "@payload-config";
import { getPayload } from "payload";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const awaitedParams = await searchParams;
  const token = awaitedParams?.t?.toString() || "";
  const userEmail = awaitedParams?.u?.toString() || "";
  let verificationResult: IEmailConfirmationFormVariants = "resend";

  if (token) {
    const actionResult = await verifyMail(token);
    if (actionResult.success) {
      verificationResult = "success";
    } else if (!actionResult.success && userEmail) {
      const payload = await getPayload({ config });
      const foundConfirmedUsers = await payload.count({
        collection: "users",
        where: {
          email: {
            equals: userEmail,
          },
          _verified: {
            equals: true,
          },
        },
      });

      if (foundConfirmedUsers.totalDocs > 0) {
        verificationResult = "already-confirmed";
      }
    }
  }

  return (
    <>
      <h1 className='text-heading-5 font-bold text-center'>Find your muse</h1>
      <div className='w-full'>
        {token ? (
          <EmailConfirmationForm
            variation={verificationResult}
            email={userEmail}
          />
        ) : (
          <RegisterForm />
        )}
      </div>
    </>
  );
}
