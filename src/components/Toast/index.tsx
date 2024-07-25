import React from 'react'

import * as RadixToast from '@radix-ui/react-toast'
import { FiX } from 'react-icons/fi'

interface ToastProps {
  title: string
  open: boolean
  setOpen: (open: boolean) => void
  description?: string
  buttonText?: string
  buttonAction?: () => void
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  buttonText,
  buttonAction,
  open,
  setOpen,
}) => {
  return (
    <RadixToast.Root
      className="bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-2 flex items-start gap-2 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex flex-col gap-1 w-full">
        <RadixToast.Title asChild>
          <span className="font-bold text-zinc-50">{title}</span>
        </RadixToast.Title>
        {description ? (
          <RadixToast.Description asChild>
            <span className="text-zinc-200">{description}</span>
          </RadixToast.Description>
        ) : null}
      </div>
      {buttonText && buttonAction ? (
        <RadixToast.Action
          className="[grid-area:_action]"
          altText="Goto schedule to undo"
          asChild
        >
          <button
            onClick={buttonAction}
            className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
          >
            {buttonText}
          </button>
        </RadixToast.Action>
      ) : null}

      <RadixToast.Close asChild>
        <FiX className="text-zinc-50" />
      </RadixToast.Close>
    </RadixToast.Root>
  )
}
