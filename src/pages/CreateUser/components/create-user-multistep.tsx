import React, { useMemo } from 'react'

import { GoArrowLeft, GoPerson, GoShieldLock } from 'react-icons/go'

import { PersonalStep } from './personal-step'
import { SecurityStep } from './security-step'

import { ContentProps, Link, MultiStep } from '@components'

export const CreateUserMultistep: React.FC = () => {
  const steps = useMemo(() => {
    return [
      {
        header: {
          title: 'Dados Pessoais',
          icon: GoPerson,
        },
        content: ({ handleNextStep }: ContentProps) => (
          <PersonalStep onSubmit={handleNextStep} />
        ),
      },
      {
        header: {
          title: 'Segurança',
          icon: GoShieldLock,
        },
        content: ({ handlePrevStep, handleFinish }: ContentProps) => (
          <SecurityStep prevStep={handlePrevStep} onSubmit={handleFinish} />
        ),
      },
    ]
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-3/12 bg-gradient-to-br from-slate-800 to-slate-900 rounded shadow-2xl">
        <div className="flex items-center justify-between py-4 px-6 border-b-2 border-zinc-800">
          <div>
            <span className="font-bold text-lg text-zinc-400">
              Criar Usuário
            </span>
          </div>
          <Link label="Voltar" href="/" icon={GoArrowLeft} />
        </div>

        <MultiStep
          onFinished={() => {}}
          allowHeaderControl={false}
          steps={steps}
        />
      </div>
    </div>
  )
}
