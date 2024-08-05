import React, { InputHTMLAttributes } from 'react'

import { useFormContext } from 'react-hook-form'

export interface CreatePostInputProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export const CreatePostInput: React.FC<CreatePostInputProps> = ({
  placeholder,
  name,
  ...rest
}) => {
  const { register } = useFormContext()

  return (
    <textarea
      {...register(name)}
      {...rest}
      maxLength={500}
      placeholder={placeholder}
      className="bg-transparent border-b-2 border-slate-700 flex-1 outline-none p-2 resize-none"
    />
  )
}
