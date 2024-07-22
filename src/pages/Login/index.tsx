import React from 'react'

import applicationMockup from '@assets/aplication-mockup.png'
import logoHorizontal from '@assets/logo-horizontal.png'

import { Input } from '@components'

export const Login: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-8/12 h-4/6 bg-slate-900 rounded flex shadow-2xl">
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center p-2">
          <img src={logoHorizontal} alt="Logo Horizontal" className="w-4/12" />
          <form action="" className="flex flex-col gap-2 w-full items-center">
            <Input size="md" label="Email" placeholder="seuemail@email.com" />
            <Input size="md" label="Senha" placeholder="******" />
            <button>Entrar</button>
          </form>
          <div>
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
