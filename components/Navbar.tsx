"use client";

import Icon from "@/components/Icon/index";
import logoutAction from "@/serverActions/logout";
import cn from "@/utils/general/cn";
import { userStore } from "@/utils/stores/userStore";
import Link from "next/link";
import { toast } from "sonner";

export default function Navbar() {
  const user = userStore.getState().user;

  // TODO: add a nice animatino when the user has logged in.

  async function handleLogout() {
    const result = await logoutAction();
    if (result.success) userStore.getState().setUser(null);
    else toast.error(result.error || "Logout failed. Please try again.");
  }

  return (
    <nav className='fixed w-full bottom-0 left-0 py-4'>
      <div className='container flex justify-center'>
        <div className='flex gap-x-4 bg-background-tint rounded-lg p-4'>
          <NavbarButton href='/' className='py-2'>
            <Icon type='logo' className='fill-foreground w-6' />
          </NavbarButton>
          {user ? (
            <>
              <NavbarButton href='/inspirations' className='text-extra-small'>
                Inspirations
              </NavbarButton>
              <NavbarButton onClick={handleLogout} className='text-extra-small'>
                Log out
              </NavbarButton>
            </>
          ) : (
            <NavbarButton href='/login'>
              <span className='text-extra-small font-semibold'>Log in</span>
            </NavbarButton>
          )}
        </div>
      </div>
    </nav>
  );
}

interface NavbarButtonBaseProps {
  className?: string;
  children: React.ReactNode;
}

interface NavbarButtonLinkProps extends NavbarButtonBaseProps {
  href: string;
  onClick?: never;
}
interface NavbarButtonButtonProps extends NavbarButtonBaseProps {
  onClick: () => void;
  href?: never;
}

function NavbarButton({
  href,
  onClick,
  className,
  children,
}: NavbarButtonButtonProps | NavbarButtonLinkProps) {
  const classes = cn(
    "flex items-center rounded-lg border-2 border-background-tint-2 py-4 px-4",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
