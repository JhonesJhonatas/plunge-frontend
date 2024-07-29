import React, { ReactNode, useCallback, useState } from 'react'

import { IconType } from 'react-icons'
import { tv } from 'tailwind-variants'

const stepIcon = tv({
  base: 'p-2 rounded-full text-zinc-50',
  variants: {
    isCurrentStep: {
      true: 'bg-blue-600',
      false: 'bg-slate-600 hover:bg-slate-700 transition-all',
    },
    isCompletedStep: {
      true: 'bg-green-600',
    },
  },
})

type Header = {
  icon: IconType
  title: string
}

type HandleNextStep = () => void
type HandlePrevStep = () => void

export interface ContentProps {
  handleNextStep: HandleNextStep
  handlePrevStep: HandlePrevStep
}

type Step = {
  header: Header
  content: (params: ContentProps) => ReactNode
}

interface MultiStepProps {
  steps: Step[]
  onFinished: () => void
  allowHeaderControl?: boolean
}

type Properties = {
  currentStep: number
}

export const MultiStep: React.FC<MultiStepProps> = ({
  steps,
  onFinished,
  allowHeaderControl,
}) => {
  const [properties, setProperties] = useState<Properties>({
    currentStep: 0,
  } as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => ({ ...oldState, ...params }))
  }, [])

  const handleNextStep = useCallback(() => {
    if (properties.currentStep === steps.length - 1) {
      onFinished()
      return
    }

    handleSetProperties({ currentStep: properties.currentStep + 1 })
  }, [handleSetProperties, onFinished, properties.currentStep, steps.length])

  const handlePrevStep = useCallback(() => {
    if (properties.currentStep === 0) {
      return
    }

    handleSetProperties({ currentStep: properties.currentStep - 1 })
  }, [handleSetProperties, properties.currentStep])

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-6 justify-center border-b-2 border-slate-800 pb-4">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => {
              if (allowHeaderControl) {
                handleSetProperties({ currentStep: index })
              }
            }}
            className="flex flex-col items-center"
          >
            <div
              className={stepIcon({
                isCurrentStep: properties.currentStep === index,
                isCompletedStep: properties.currentStep > index,
              })}
            >
              <step.header.icon />
            </div>
            <span className="font-bold">{step.header.title}</span>
          </button>
        ))}
      </div>
      <div>
        {steps[properties.currentStep].content({
          handleNextStep,
          handlePrevStep,
        })}
      </div>
    </div>
  )
}
