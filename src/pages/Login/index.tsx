import React, { useCallback } from 'react'

import applicationMockup from '@assets/aplication-mockup.png'
import logoHorizontal from '@assets/logo-horizontal.png'

import { Button, Form } from '@components'
import { z } from 'zod'
import { useAuth } from '@/modules/user/hooks/use-auth'

const formSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
})

type FormSchema = z.infer<typeof formSchema>

export const Login: React.FC = () => {
  const {
    handlers: { handleSignIn },
  } = useAuth()

  const onSubmit = useCallback(
    ({ email, password }: FormSchema) => {
      handleSignIn({ email, password })
    },
    [handleSignIn],
  )

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-8/12 h-4/6 bg-slate-900 rounded flex shadow-2xl">
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center p-2">
          <img src={logoHorizontal} alt="Logo Horizontal" className="w-4/12" />
          <Form
            formSchema={formSchema}
            onSubmitForm={onSubmit}
            className="flex flex-col gap-6 w-full items-center"
          >
            <Form.Input
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
            <Button type="submit" width="lg">
              Entrar
            </Button>
          </Form>
          <div className="flex items-center gap-4">
            <span>Esqueceu a senha?</span>
            <span>Criar conta</span>
          </div>
        </div>
        <div className="w-full overflow-hidden flex items-center">
          <img src={applicationMockup} alt="Application Mockup" />
        </div>
      </div>
    </div>
  )
}
