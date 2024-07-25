import React, { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface CustomItemProps {
  className?: string
  children: ReactNode
}

export const CustomItem: React.FC<CustomItemProps> = ({
  children,
  className = 'outline-none',
}) => {
  return <DropdownMenu.Item className={className}>{children}</DropdownMenu.Item>
}
