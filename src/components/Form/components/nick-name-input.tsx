import React from 'react'

import InputMask from 'react-input-mask'

import { useFormContext } from 'react-hook-form'

export interface NickNameInputProps {
  name: string
  label?: string
  isRequired?: boolean
}

export const NickNameInput: React.FC<NickNameInputProps> = ({
  name,
  label,
  isRequired,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col">
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
      <InputMask
        {...register(name)}
        mask="@***************"
        maskChar=""
        alwaysShowMask={true}
        onChange={(event) => {
          event.target.value = event.target.value.toLowerCase()
        }}
        className="w-full p-2 rounded bg-slate-700 outline-none border-2 border-transparent focus:border-2 focus:border-blue-600"
      />
    </div>
  )
}
