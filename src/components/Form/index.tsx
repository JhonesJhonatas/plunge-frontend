import React, { FormHTMLAttributes } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { ZodSchema } from 'zod'

import { Input } from '@/components/Form/components/input'
import { CreatePostInput } from '@/components/Form/components/create-post-input'
import {
  NickNameInput,
  NickNameInputProps,
} from '@/components/Form/components/nick-name-input'

type FormData<T extends ZodSchema> =
  T extends ZodSchema<infer Data> ? Data : never

interface FormProps<T extends ZodSchema>
  extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  formSchema: T
  onSubmitForm: SubmitHandler<FormData<T>>
  resetOnSubmit?: boolean
  className?: string
  defaultValue?: FormData<T>
}

export const Form = <T extends ZodSchema>({
  children,
  formSchema,
  onSubmitForm,
  resetOnSubmit,
  className,
  defaultValue,
}: FormProps<T>) => {
  const methods = useForm<FormData<T>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    methods.handleSubmit(async (data) => {
      await onSubmitForm(data)
      if (resetOnSubmit) {
        methods.reset()
      }
    })(event)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}

Form.Input = Input
Form.CreatePostInput = CreatePostInput
Form.NickNameInput = NickNameInput as React.FC<NickNameInputProps>
