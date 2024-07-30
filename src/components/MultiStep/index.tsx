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

type HandleNextStep = (onPrev?: () => void) => void
type HandlePrevStep = (onNext?: () => void) => void
type HandleFinish = (onFinish?: () => void) => void

export interface ContentProps {
  handleNextStep: HandleNextStep
  handlePrevStep: HandlePrevStep
  handleFinish: HandleFinish
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

export const MultiStep: React.FC<MultiStepProps> = ({
  steps,
  onFinished,
  allowHeaderControl,
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNextStep = useCallback(
    (onNext?: () => void) => {
      if (currentStep === steps.length - 1) {
        return
      }

      if (onNext) {
        onNext()
      }

      setCurrentStep((oldState) => oldState + 1)
    },
    [currentStep, steps.length],
  )

  const handlePrevStep = useCallback(
    (onNext?: () => void) => {
      if (currentStep === 0) {
        return
      }

      if (onNext) {
        onNext()
      }

      setCurrentStep((oldState) => oldState - 1)
    },
    [currentStep],
  )

  const handleFinish = useCallback(
    (onNext?: () => void) => {
      if (currentStep === steps.length - 1) {
        if (onNext) {
          onNext()
        }

        onFinished()
      }
    },
    [currentStep, onFinished, steps.length],
  )

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-6 justify-center border-b-2 border-slate-800 pb-4">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => {
              if (allowHeaderControl) {
                setCurrentStep(index)
              }
            }}
            className="flex flex-col items-center"
          >
            <div
              className={stepIcon({
                isCurrentStep: currentStep === index,
                isCompletedStep: currentStep > index,
              })}
            >
              <step.header.icon />
            </div>
            <span className="font-bold">{step.header.title}</span>
          </button>
        ))}
      </div>
      <div>
        {steps[currentStep].content({
          handleNextStep,
          handlePrevStep,
          handleFinish,
        })}
      </div>
    </div>
  )
}
