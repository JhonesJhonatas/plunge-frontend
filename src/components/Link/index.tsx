import React, { useCallback } from 'react'

import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
import { tv } from 'tailwind-variants'

const link = tv({
  base: 'font-bold transition-all flex items-center gap-2',
  variants: {
    disabled: {
      true: 'cursor-not-allowed text-gray-400',
      false: 'cursor-pointer text-blue-500 hover:text-blue-600',
    },
  },
})

interface LinkProps {
  label: string
  href: string
  disabled?: boolean
  icon?: IconType
}

export const Link: React.FC<LinkProps> = ({
  label,
  href,
  disabled,
  icon: Icon,
}) => {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(href)
  }, [navigate, href])

  return (
    <div
      onClick={disabled ? () => {} : handleClick}
      className={link({ disabled })}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </div>
  )
}
