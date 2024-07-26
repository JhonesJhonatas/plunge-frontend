import React, {
  InputHTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react'

import { useFormContext } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { VariantProps, tv } from 'tailwind-variants'

const inputBox = tv({
  base: 'flex flex-col gap-1',
  variants: {
    boxSize: {
      sm: 'w-4/12',
      md: 'w-6/12',
      lg: 'w-8/12',
      block: 'w-full',
    },
  },
  defaultVariants: {
    boxSize: 'block',
  },
})

const variants = tv({
  base: 'flex items-center rounded p-2 w-full focus:border-primary transition-all',
  variants: {
    hasError: {
      true: 'border-error focus:border-error',
      false: 'focus:border-primary',
    },
  },
})

type InputVariants = VariantProps<typeof variants>
type InputBox = VariantProps<typeof inputBox>

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    InputVariants,
    InputBox {
  placeHolder?: string
  label?: string
  isRequired?: boolean
  name: string
  type: 'text' | 'password'
}

export const Input: React.FC<InputProps> = ({
  name,
  placeHolder,
  label,
  isRequired,
  type,
  boxSize,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const IconPassword = useMemo(
    () => (showPassword ? FiEye : FiEyeOff),
    [showPassword],
  )

  const typePassword = useMemo(
    () => (showPassword ? 'text' : 'password'),
    [showPassword],
  )

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prevValue) => !prevValue)
  }, [])

  return (
    <div className={inputBox({ boxSize })}>
      <div className="flex justify-between">
        <label className="font-semibold text-sm">
          {label}
          {isRequired ? <span className="text-red-600">*</span> : null}
        </label>
        {errors[name] ? (
          <small className="text-red-500 font-semibold">
            {errors[name]?.message as string}
          </small>
        ) : null}
      </div>

      <div className="relative w-full">
        <input
          {...register(name)}
          className="w-full p-2 rounded bg-slate-700"
          placeholder={placeHolder}
          type={type === 'password' ? typePassword : type}
          {...props}
        />
        {type === 'password' ? (
          <IconPassword
            className="cursor-pointer absolute right-2 top-3"
            onClick={handleTogglePassword}
          />
        ) : null}
      </div>
    </div>
  )
}
