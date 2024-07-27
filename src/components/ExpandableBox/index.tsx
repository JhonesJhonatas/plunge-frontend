import React, { ReactNode, useMemo, useState } from 'react'

import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import { tv } from 'tailwind-variants'

const expandableBox = tv({
  base: 'transition-all',
  variants: {
    isOpen: {
      true: 'block',
      false: 'hidden',
    },
  },
})

interface ExpandableBoxProps {
  title: string
  children: ReactNode
}

export const ExpandableBox: React.FC<ExpandableBoxProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const Icon = useMemo(() => {
    return isOpen ? GoChevronUp : GoChevronDown
  }, [isOpen])

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-2 transition-all">
      <div className="flex items-center justify-between">
        <span className="font-bold">{title}</span>
        <Icon
          onClick={() => setIsOpen((oldState) => !oldState)}
          className="cursor-pointer"
          size={18}
        />
      </div>
      <div className={expandableBox({ isOpen })}>{children}</div>
    </div>
  )
}
