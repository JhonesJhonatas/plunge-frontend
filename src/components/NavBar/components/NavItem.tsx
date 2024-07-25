import React from 'react'

import { tv } from 'tailwind-variants'
import { IconType } from 'react-icons'
import { useLocation, useNavigate } from 'react-router-dom'

const navItem = tv({
  base: 'flex items-center gap-2  transition-all font-bold',
  variants: {
    active: {
      true: 'text-blue-400 cursor-pointer',
      false: 'cursor-pointer hover:text-blue-300',
    },
    disabled: {
      true: 'text-zinc-600 cursor-not-allowed hover:text-zinc-600',
    },
  },
})

interface NavItemProps {
  label: string
  icon: IconType
  path: string
  disabled?: boolean
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  path,
  icon: Icon,
  disabled,
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isActive = pathname === path

  return (
    <div
      onClick={isActive || disabled ? undefined : () => navigate(path)}
      className={navItem({ active: isActive, disabled })}
    >
      <Icon />
      <span>{label}</span>
    </div>
  )
}
