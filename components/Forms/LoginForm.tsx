"use client";

import Button from "@/components/Buttons/Button";
import TextInput from "@/components/FormComponents/TextInput";
import TertiaryLink from "@/components/General/TertiaryLink";
import login from "@/serverActions/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setError(null);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const loginResult = await login({ email, password });

    if (loginResult.success) {
      // TODO: probably redirect to inspiration collection page.
      router.push("/");
    } else {
      setError(loginResult.error || "Login failed. Please try again.");
    }
  }

  return (
    <form className='flex flex-col gap-y-4 max-w-md' onSubmit={handleSubmit}>
      <label className='flex flex-col gap-y-2'>
        <TextInput
          type='email'
          name='email'
          label='Email'
          autoComplete='email'
          required
        />
      </label>
      <label className='flex flex-col gap-y-2'>
        <TextInput
          type='password'
          name='password'
          label='Password'
          autoComplete='current-password'
          required
        />
      </label>
      {error && <div className='text-red-500 text-extra-small'>{error}</div>}
      <div className='flex justify-between items-end gap-x-10'>
        {/* TODO: have this button reflect state */}
        <Button type='submit' variant='default' className='w-fit'>
          Log in
        </Button>
        <TertiaryLink href='/forgot-password'>
          I don&apos;t have an account
        </TertiaryLink>
      </div>
    </form>
  );
}
