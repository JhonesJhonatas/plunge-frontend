import React, { useCallback } from 'react'

import { z } from 'zod'

import applicationMockup from '@assets/aplication-mockup.png'
import logoHorizontal from '@assets/logo-horizontal.png'

import { Button, Form, Link } from '@components'
import { useAuth } from '@user'
import { useParams } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormSchema = z.infer<typeof formSchema>

export const Login: React.FC = () => {
  const {
    isSubmitting,
    handlers: { handleSignIn },
  } = useAuth()
  const { email } = useParams()

  const onSubmit = useCallback(
    ({ email, password }: FormSchema) => {
      handleSignIn({ email, password })
    },
    [handleSignIn],
  )

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-8/12 h-5/6 bg-gradient-to-br from-slate-800 to-slate-900 rounded flex shadow-2xl">
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center p-2">
          <img src={logoHorizontal} alt="Logo Horizontal" className="w-4/12" />
          <Form
            formSchema={formSchema}
            onSubmitForm={onSubmit}
            className="flex flex-col gap-6 w-full items-center"
          >
            <Form.Input
              defaultValue={email}
              name="email"
              type="text"
              label="Email"
              placeholder="seuemail@email.com"
              boxSize="lg"
            />
            <Form.Input
              name="password"
              type="password"
              label="Senha"
              placeholder="******"
              boxSize="lg"
            />
            <Button
              type="submit"
              loading={isSubmitting}
              loadingMessage="Verificando as credenciais..."
              width="lg"
            >
              Entrar
            </Button>
          </Form>
          <div className="flex items-center gap-4">
            <Link label="Esqueceu a senha?" href="" disabled />
            <Link label="Criar conta" href="/create-user" />
          </div>
        </div>
        <div className="w-full overflow-hidden flex items-center">
          <img src={applicationMockup} alt="Application Mockup" />
        </div>
      </div>
    </div>
  )
}
