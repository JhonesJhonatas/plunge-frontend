import React, { useCallback } from 'react'

import { z } from 'zod'
import { GoArrowRight } from 'react-icons/go'

import { Button, Form } from '@components'
import { useCreateUserMultistep } from '@/modules/user'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  bio: z.string(),
  nickName: z
    .string()
    .min(4, { message: 'NickName deve ter no mínimo 4 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
})

type FormSchema = z.infer<typeof formSchema>

interface PersonalStepProps {
  onSubmit: (onNext?: () => void) => void
}

export const PersonalStep: React.FC<PersonalStepProps> = ({ onSubmit }) => {
  const {
    formData,
    handlers: { handleSetFormData },
  } = useCreateUserMultistep()

  const handleSubmit = useCallback(
    (params: FormSchema) => {
      onSubmit(() => handleSetFormData(params))
    },
    [handleSetFormData, onSubmit],
  )

  return (
    <Form
      onSubmitForm={handleSubmit}
      formSchema={formSchema}
      className="flex flex-col gap-4"
      defaultValue={{
        name: formData.name,
        bio: formData.bio,
        nickName: formData.nickName,
        email: formData.email,
      }}
    >
      <Form.Input
        type="text"
        name="name"
        label="Nome:"
        placeHolder="Seu Nome"
      />
      <Form.NickNameInput name="nickName" label="Apelido:" />
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
