import { useEffect, useRef } from "react";
import IconButton from "./Buttons/IconButton";

interface IPopupBaseProps extends React.HTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  closeCallback: () => void;
}

export default function PopupBase({
  isOpen,
  closeCallback,
  children,
}: IPopupBaseProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function handleClose() {
    if (!dialogRef.current) return;
    dialogRef.current.close();
    closeCallback();
  }

  return (
    <dialog
      ref={dialogRef}
      className='fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-(--container-whitespace) bg-transparent backdrop:bg-background/30'
      onClose={closeCallback}
    >
      <div className='mx-auto bg-background-tint w-full max-w-md rounded-lg px-4 py-2 flex flex-col gap-y-4'>
        <div className='flex justify-end'>
          <IconButton
            iconType='plus'
            aria-label='Close popup'
            size='default'
            colorScheme='default'
            className='rotate-45'
            onClick={handleClose}
          />
        </div>
        <div className='text-foreground'>{children}</div>
      </div>
    </dialog>
  );
}
