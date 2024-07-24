import { Link } from '@/components'
import { MultiStep } from '@/components/MultiStep'
import React from 'react'
import { GoArrowLeft } from 'react-icons/go'

export const CreateUser: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-8/12 h-5/6 bg-slate-900 rounded shadow-2xl">
        <div className="flex items-center justify-between py-4 px-6 border-b-2 border-zinc-800">
          <div>
            <span className="font-bold text-lg text-zinc-400">
              Criar Usuário
            </span>
          </div>
          <Link label="Voltar" href="/" icon={GoArrowLeft} />
        </div>
        <MultiStep
          steps={[
            {
              header: {
                title: 'Step 1',
              },
              content: <span>Step 1</span>,
            },
            {
              header: {
                title: 'Step 2',
              },
              content: <span>Step 2 </span>,
            },
          ]}
        />
      </div>
    </div>
  )
}
