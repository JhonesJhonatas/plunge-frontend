import React, { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Trigger } from '@/components/DropDown/trigger'
import { Content } from '@/components/DropDown/content'
import { Item } from '@/components/DropDown/item'
import { CustomItem } from '@/components/DropDown/custom-item'

interface DropDownProps {
  children: ReactNode
}

interface DropDownComponent extends React.FC<DropDownProps> {
  Trigger: typeof Trigger
  Content: typeof Content
  Item: typeof Item
  CustomItem: typeof CustomItem
}

export const DropDown: DropDownComponent = ({ children }) => {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}

DropDown.Trigger = Trigger
DropDown.Content = Content
DropDown.Item = Item
DropDown.CustomItem = CustomItem
