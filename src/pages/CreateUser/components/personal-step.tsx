import React, { useCallback } from 'react'

import { z } from 'zod'
import { GoArrowRight } from 'react-icons/go'

import { Button, Form } from '@components'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  bio: z.string(),
  nickName: z
    .string()
    .min(3, { message: 'NickName deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
})

type FormSchema = z.infer<typeof formSchema>

interface PersonalStepProps {
  handleSetFormData: (params: Partial<FormSchema>) => void
  onSubmit: () => void
}

export const PersonalStep: React.FC<PersonalStepProps> = ({
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
        type="text"
        name="name"
        label="Nome:"
        placeHolder="Seu Nome"
      />
      <Form.Input
        type="text"
        name="nickName"
        label="Apelido:"
        placeHolder="@seuapelido"
      />
      <Form.Input
        type="text"
        name="email"
        label="Email:"
        placeHolder="seuemail@email.com"
      />
      <Form.Input
        type="text"
        name="bio"
        label="Biografia: (Opiocional)"
        placeHolder="Uma breve descrição sobre você"
      />
      <Button type="submit">
        <div className="flex items-center justify-center gap-2">
          <span>Próximo</span>
          <GoArrowRight />
        </div>
      </Button>
    </Form>
  )
}
