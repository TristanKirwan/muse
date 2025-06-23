"use client";

import Button from "@/components/Buttons/Button";
import TextInput from "@/components/FormComponents/TextInput";
import TertiaryLink from "@/components/General/TertiaryLink";
import TextLink from "@/components/TextLink";
import register from "@/serverActions/register";
import { useState } from "react";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setError(null);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const registerResult = await register({ email, password, confirmPassword });

    if (!registerResult.success) {
      setError(
        registerResult.error || "Registration failed. Please try again."
      );
      return;
    }

    setSuccess(true);
  }

  return !success ? (
    <form className='flex flex-col gap-y-4 max-w-md' onSubmit={handleSubmit}>
      <TextInput
        type='email'
        name='email'
        label='Email'
        autoComplete='email'
        required
      />
      <TextInput
        type='password'
        name='password'
        label='Password'
        required
        autoComplete='new-password'
      />
      <TextInput
        type='password'
        name='confirmPassword'
        label='Confirm password'
        autoComplete='new-password'
        required
      />
      {error && <div className='text-red-500 text-extra-small'>{error}</div>}
      <div className='flex justify-between items-end gap-x-10'>
        {/* TODO: have this button reflect state */}
        <Button type='submit' variant='default' className='w-fit'>
          Register
        </Button>
        <TertiaryLink href='/login'>I already have an account</TertiaryLink>
      </div>
    </form>
  ) : (
    <div className='flex flex-col gap-y-2'>
      <p>An email has been sent to your email address.</p>
      <p>
        Please confirm your email address and{" "}
        <TextLink href='/login' label='log in' className='inline-flex' />.
      </p>
    </div>
  );
}
