import React, { useCallback } from 'react'

import { z } from 'zod'

import { Button, Form } from '@components'
import { useCreateUserMultistep } from '@/modules/user'

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  })

type FormSchema = z.infer<typeof formSchema>

interface SecurityStepProps {
  prevStep: (onPrev?: () => void) => void
  onSubmit: (onFinish?: () => void) => void
}

export const SecurityStep: React.FC<SecurityStepProps> = ({
  prevStep,
  onSubmit,
}) => {
  const {
    formData,
    handlers: { handleSetFormData, handleFinish },
  } = useCreateUserMultistep()

  const handleSubmit = useCallback(
    (params: FormSchema) => {
      onSubmit(() => handleSetFormData(params))
      handleFinish(params.password)
    },
    [handleFinish, handleSetFormData, onSubmit],
  )

  return (
    <Form
      onSubmitForm={(params: FormSchema) => {
        handleSubmit(params)
      }}
      formSchema={formSchema}
      defaultValue={{
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }}
      className="flex flex-col gap-4"
    >
      <Form.Input
        type="password"
        name="password"
        label="Senha:"
        placeHolder="******"
      />
      <Form.Input
        type="password"
        name="confirmPassword"
        label="Confirmação de Senha:"
        placeHolder="******"
      />

      <div className="flex items-center gap-4">
        <Button type="button" onClick={() => prevStep()}>
          <span>Voltar</span>
        </Button>
        <Button type="submit">
          <span>Finalizar</span>
        </Button>
      </div>
    </Form>
  )
}
