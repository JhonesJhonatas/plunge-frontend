import Image from 'next/image'

import plungeHorizontalLogo from '@/app/assets/plunge-horizontal-logo.svg'
import applicationScreen from '@/app/assets/application-screen.png'
import { Button, Input } from '@/app/components'

export default function Login() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex w-3/5 h-3/4 bg-gradient-to-r from-slate-800 to-slate-900 text-slate-50 rounded gap-8 shadow-2xl p-8 border-2 border-slate-800">
        <section className="w-1/2 flex flex-col gap-8 justify-between">
          <Image src={plungeHorizontalLogo} alt="" className="max-w-44" />
          <div className="w-full flex flex-col gap-8 items-center">
            <div className="flex flex-col gap-2 items-center">
              <span className="text-3xl font-bold">LogIn na Plunge</span>
              <span className="text-zinc-300">
                Fique por dentro de tudo que envolve a Campus Party
              </span>
            </div>
            <div className="w-full flex items-center gap-2 justify-center">
              <div>
                <span>Google</span>
              </div>
              <div>
                <span>Github</span>
              </div>
              <div>
                <span>Linkedin</span>
              </div>
            </div>
            <div className=" flex gap-8 w-full justify-center items-center">
              <hr className="w-1/6 border-zinc-600" />
              <span className="text-zinc-300">Ou utilize seu email</span>
              <hr className="w-1/6 border-zinc-600" />
            </div>
            <form className="flex flex-col gap-4 w-3/5">
              <Input />
              <Input />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <input type="checkbox" />
                  <span>Manter Conectado</span>
                </div>
                <span className="cursor-pointer text-blue-600 font-bold hover:text-blue-500 transition-all">
                  Esqueceu a senha?
                </span>
              </div>
              <Button>Entrar</Button>
            </form>
            <div className="w-full flex flex-col items-center gap-2">
              <span>Ainda não possui uma conta?</span>
              <span className="cursor-pointer text-blue-600 font-bold hover:text-blue-500 transition-all">
                Criar Conta
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <span className="text-zinc-500">
              Criado com 💖 por <strong>Jhones Jhonatas</strong>
            </span>
            <span className="text-zinc-500">
              ©️ Todos os direitos reservados
            </span>
          </div>
        </section>
        <section className="w-1/2 overflow-hidden rounded">
          <Image
            src={applicationScreen}
            alt=""
            className="object-cover h-full"
          />
        </section>
      </div>
    </div>
  )
}
