import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'p-2 rounded bg-blue-600 transition-all',
  variants: {
    width: {
      xs: 'w-fit text-xs',
      sm: 'w-fit text-sm',
      md: 'w-6/12',
      lg: 'w-8/12',
      fit: 'w-fit h-fit',
      block: 'w-full',
    },
    typeColor: {
      primary: 'bg-blue-600 hover:bg-blue-500',
    },
    disabled: {
      true: 'bg-zinc-700  cursor-not-allowed hover:bg-zinc-700',
      false: '',
    },
  },
  defaultVariants: {
    width: 'block',
    typeColor: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children: ReactNode
  loading?: boolean
  loadingMessage?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled,
  loading,
  loadingMessage,
  width,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      {...rest}
      className={button({ width, disabled: loading || disabled })}
    >
      {loading ? loadingMessage : children}
    </button>
  )
}
