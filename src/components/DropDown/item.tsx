import React from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { IconType } from 'react-icons'

interface ItemProps {
  icon: IconType
  label: string
  onClick?: () => void
}

export const Item: React.FC<ItemProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <DropdownMenu.Item
      onClick={onClick}
      className="py-1 px-2 flex items-center gap-2 cursor-pointer outline-none bg-slate-500 bg-opacity-30 hover:bg-opacity-55 transition-all rounded"
    >
      <Icon />
      <span>{label}</span>
    </DropdownMenu.Item>
  )
}
