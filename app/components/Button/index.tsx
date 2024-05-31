import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'p-2 rounded bg-blue-600 text-slate-50 font-bold',
})

interface ButtonProps {
  children: ReactNode
}

export function Button({ children }: ButtonProps) {
  return <button className={button()}>{children}</button>
}
