import LoginForm from "@/components/Forms/LoginForm";
import Icon from "@/components/Icon";

export default function LoginPage() {
  return (
    <main className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center gap-y-4 border border-background-tint rounded-sm p-2 w-3/4 max-w-md'>
        <Icon type='logo' className='w-20 fill-foreground' />
        <h1 className='text-heading-5 font-bold text-center'>Welcome back!</h1>
        <div className='w-full'>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
