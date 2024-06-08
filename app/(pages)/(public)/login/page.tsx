import Image from 'next/image'

import plungeHorizontalLogo from '@/app/assets/plunge-horizontal-logo.svg'
import applicationMockup from '@/app/assets/application-mockup.svg'

import { Button, Input } from '@/app/components'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { BsLinkedin } from 'react-icons/bs'

export default function Login() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex overflow-auto w-3/5 h-3/4 bg-gradient-to-r from-slate-800 to-slate-900 text-slate-50 rounded gap-8 shadow-2xl p-8 border-2 border-slate-800">
        <section className="w-1/2 h-full">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-3/4 flex flex-col gap-4 items-center mx-auto">
              <div className="flex flex-col gap-4 items-center">
                <div className="flex items-start gap-2">
                  <span className="text-3xl font-bold">LogIn na </span>
                  <Image
                    src={plungeHorizontalLogo}
                    alt=""
                    className="max-w-36"
                  />
                </div>
                <span className="text-zinc-300">
                  Fique por dentro de tudo que envolve a Campus Party
                </span>
              </div>
              <div className="w-full flex items-center gap-2 justify-center">
                <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded cursor-pointer hover:bg-slate-600 transition-all border-2 border-slate-600">
                  <FcGoogle />
                  <span>Google</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded cursor-pointer hover:bg-slate-600 transition-all border-2 border-slate-600">
                  <FaGithub />
                  <span>Github</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded cursor-pointer hover:bg-slate-600 transition-all border-2 border-slate-600">
                  <BsLinkedin />
                  <span>Google</span>
                </div>
              </div>
              <div className="w-full flex gap-8 justify-center items-center">
                <hr className="w-3/12 border-zinc-600" />
                <span className="text-zinc-300">Ou utilize seu email</span>
                <hr className="w-3/12 border-zinc-600" />
              </div>
              <form className="flex flex-col gap-4 w-full">
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
            src={applicationMockup}
            alt=""
            className="object-cover h-full"
          />
        </section>
      </div>
    </div>
  )
}
