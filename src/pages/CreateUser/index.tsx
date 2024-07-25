import React, { useCallback } from 'react'

import { z } from 'zod'
import { GoArrowLeft } from 'react-icons/go'

import { Button, Form, Link } from '@components'
import { useCreateUser } from '@/modules/user'

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
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

export const CreateUser: React.FC = () => {
  const {
    loading,
    handlers: { handleCreateUser },
  } = useCreateUser()

  const onSubmit = useCallback(
    ({ email, name, password }: FormSchema) => {
      handleCreateUser({ email, name, password })
    },
    [handleCreateUser],
  )

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-3/12 bg-slate-900 rounded shadow-2xl">
        <div className="flex items-center justify-between py-4 px-6 border-b-2 border-zinc-800">
          <div>
            <span className="font-bold text-lg text-zinc-400">
              Criar Usuário
            </span>
          </div>
          <Link label="Voltar" href="/" icon={GoArrowLeft} />
        </div>
        <Form
          onSubmitForm={onSubmit}
          formSchema={formSchema}
          className="flex flex-col gap-6 p-8"
        >
          <Form.Input
            label="Nome"
            name="name"
            placeHolder="Seu Nome"
            type="text"
          />
          <Form.Input
            label="Email"
            name="email"
            placeHolder="seuemail@email.com"
            type="text"
          />
          <Form.Input
            label="Senha"
            name="password"
            placeHolder="******"
            type="password"
          />
          <Form.Input
            label="Confirme sua senha"
            name="confirmPassword"
            placeHolder="******"
            type="password"
          />
          <Button type="submit" disabled={loading}>
            Criar
          </Button>
        </Form>
      </div>
    </div>
  )
}
