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
      className='fixed w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-(--container-whitespace) h-9/10 bg-transparent backdrop:bg-background/30'
      onClose={closeCallback}
    >
      <div className='relative mx-auto bg-background-tint w-full rounded-lg max-w-5xl p-4 flex flex-col gap-y-4 @container/popup'>
        <div className='absolute top-4 right-4 flex justify-end z-10'>
          <IconButton
            iconType='plus'
            aria-label='Close popup'
            size='small'
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
