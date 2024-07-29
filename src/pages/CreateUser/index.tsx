import React, { useCallback, useState } from 'react'

import { GoArrowLeft, GoPerson, GoShieldLock } from 'react-icons/go'

import { ContentProps, Link, MultiStep } from '@components'

import { PersonalStep } from './components/personal-step'
import { SecurityStep } from './components/security-step'

type FormData = {
  name: string
  nickName: string
  email: string
  bio: string
  password: string
}

export const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({} as FormData)

  const handleSetFormData = useCallback((params: Partial<FormData>) => {
    setFormData((oldState) => ({ ...oldState, ...params }))
  }, [])

  const handleFinish = useCallback(() => {
    console.log('---------- DEBUG ----------')
    console.log(formData)
    console.log('---------- DEBUG ----------')
  }, [formData])

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
          onFinished={handleFinish}
          allowHeaderControl={false}
          steps={[
            {
              header: {
                title: 'Dados Pessoais',
                icon: GoPerson,
              },
              content: ({ handleNextStep }: ContentProps) => (
                <PersonalStep
                  onSubmit={handleNextStep}
                  handleSetFormData={handleSetFormData}
                />
              ),
            },
            {
              header: {
                title: 'Segurança',
                icon: GoShieldLock,
              },
              content: ({ handleNextStep, handlePrevStep }: ContentProps) => (
                <SecurityStep
                  onSubmit={handleNextStep}
                  prevStep={handlePrevStep}
                  handleSetFormData={handleSetFormData}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
