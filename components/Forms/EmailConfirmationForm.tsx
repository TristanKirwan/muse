"use client";

import { useState } from "react";

import Button from "@/components/Buttons/Button";
import TextInput from "@/components/FormComponents/TextInput";
import TextLink from "@/components/TextLink";
import sendConfirmationMail from "@/serverActions/sendConfirmationMail";

export type IEmailConfirmationFormVariants =
  | "success"
  | "already-confirmed"
  | "resend";

export default function EmailConfirmationScreen({
  variation,
  email,
}: {
  variation: IEmailConfirmationFormVariants;
  email?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  if (variation === "success" || variation === "already-confirmed") {
    const message =
      variation === "success"
        ? "Your email address has been confirmed."
        : "Your email address has already been confirmed.";
    return (
      <div>
        <p>
          {message}{" "}
          <TextLink href='/login' label='Get started' className='inline-flex' />
        </p>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setError(null);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    const sendConfirmationResult = await sendConfirmationMail({ email });

    if (sendConfirmationResult.success) {
      setFormSuccess(true);
    } else {
      setError(
        sendConfirmationResult.error ||
          "Failed to send verification mail. Please try again."
      );
    }
  }

  if (formSuccess) {
    return (
      <p>
        A verification email has been sent. Please check your inbox and follow
        the instructions.
      </p>
    );
  }

  return (
    <form className='flex flex-col gap-y-4 max-w-md' onSubmit={handleSubmit}>
      <p>
        Something went wrong while confirming your email address. Please try
        again.
      </p>
      <TextInput
        type='email'
        name='email'
        label='Email'
        autoComplete='email'
        defaultValue={email || ""}
        required
      />
      {error && <div className='text-red-500 text-extra-small'>{error}</div>}
      <Button type='submit' variant='default' className='w-fit'>
        Send verification
      </Button>
    </form>
  );
}
