import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import * as RadixToast from '@radix-ui/react-toast'

import { Toast } from '@/components/Toast'

interface ToastContentSchema {
  title: string
  description?: string
  buttonText?: string
  buttonAction?: () => void
}

type ToastContextProps = {
  addToast: ({ title, description }: ToastContentSchema) => void
}

type ToastProviderProps = {
  children: ReactNode
}

const ToastContext = createContext({} as ToastContextProps)

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [toastContent, setToastContent] = useState({} as ToastContentSchema)

  const addToast = useCallback(
    ({ title, buttonAction, buttonText, description }: ToastContentSchema) => {
      setOpen(true)
      setToastContent({ title, buttonAction, buttonText, description })
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ addToast }}>
      <RadixToast.Provider swipeDirection="right">
        <Toast
          open={open}
          setOpen={setOpen}
          title={toastContent.title}
          description={toastContent.description}
          buttonAction={toastContent?.buttonAction}
          buttonText={toastContent?.buttonText}
        />
        <RadixToast.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </RadixToast.Provider>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
