import React, { useCallback } from 'react'

import { z } from 'zod'

import { Button, Form } from '@components'

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
  onSubmit: () => void
  prevStep: () => void
  handleSetFormData: (params: Partial<FormSchema>) => void
}

export const SecurityStep: React.FC<SecurityStepProps> = ({
  prevStep,
  handleSetFormData,
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (params: FormSchema) => {
      handleSetFormData(params)
      onSubmit()
    },
    [handleSetFormData, onSubmit],
  )

  return (
    <Form
      onSubmitForm={handleSubmit}
      formSchema={formSchema}
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
        <Button type="button" onClick={prevStep}>
          <span>Voltar</span>
        </Button>
        <Button type="submit">
          <span>Finalizar</span>
        </Button>
      </div>
    </Form>
  )
}
