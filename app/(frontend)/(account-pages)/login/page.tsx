import LoginForm from "@/components/Forms/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className='text-heading-5 font-bold text-center'>Welcome back</h1>
      <div className='w-full'>
        <LoginForm />
      </div>
    </>
  );
}
