import React, { InputHTMLAttributes } from 'react'

import { useFormContext } from 'react-hook-form'

export interface CreatePostInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export const CreatePostInput: React.FC<CreatePostInputProps> = ({
  placeholder,
  name,
  ...rest
}) => {
  const { register } = useFormContext()

  return (
    <input
      {...register(name)}
      {...rest}
      type="text"
      placeholder={placeholder}
      className="bg-transparent border-b-2 border-slate-700 flex-1 outline-none p-2"
    />
  )
}
