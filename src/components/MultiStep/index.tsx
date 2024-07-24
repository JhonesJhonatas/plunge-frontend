import React, { ReactNode, useCallback, useState } from 'react'

type Header = {
  icon?: ReactNode
  title: string
}

type Step = {
  header: Header
  content: ReactNode
}

interface MultiStepProps {
  steps: Step[]
  allowHeaderControl?: boolean
}

type Properties = {
  currentStep: number
}

export const MultiStep: React.FC<MultiStepProps> = ({ steps }) => {
  const [properties, setProperties] = useState<Properties>({
    currentStep: 0,
  } as Properties)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => ({ ...oldState, ...params }))
  }, [])

  return (
    <div>
      <div>
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => handleSetProperties({ currentStep: index })}
          >
            {step.header.title}
          </button>
        ))}
      </div>
      <div>{steps[properties.currentStep].content}</div>
    </div>
  )
}
