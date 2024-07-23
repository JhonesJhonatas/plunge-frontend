import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'p-2 rounded bg-blue-600',
  variants: {
    width: {
      sm: 'w-4/12',
      md: 'w-6/12',
      lg: 'w-8/12',
      block: 'w-full',
    },
  },
  defaultVariants: {
    width: 'block',
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
      disabled={disabled || loading}
      {...rest}
      className={button({ width })}
    >
      {loadingMessage || children}
    </button>
  )
}
