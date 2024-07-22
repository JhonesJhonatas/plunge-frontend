import React from 'react'

import { tv, VariantProps } from 'tailwind-variants'

const inputBox = tv({
  base: '',
  variants: {
    size: {
      sm: 'w-1/4',
      md: 'w-2/4',
      lg: 'w-3/4',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})

const input = tv({
  base: 'p-1 rounded bg-slate-800 border-2 border-slate-600 w-full',
  variants: {},
  defaultVariants: {},
})

type InputBoxStyleProps = VariantProps<typeof inputBox>
type InputStyleProps = VariantProps<typeof input>

interface InputProps extends InputStyleProps, InputBoxStyleProps {
  placeholder?: string
  label?: string
}

export const Input: React.FC<InputProps> = ({ size, placeholder, label }) => {
  return (
    <div className={inputBox({ size })}>
      <div>{label ? <span>{label}</span> : null}</div>
      <input type="text" placeholder={placeholder} className={input()} />
    </div>
  )
}
