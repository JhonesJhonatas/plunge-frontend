import React from 'react'

import { GoKebabHorizontal, GoPencil, GoTrash } from 'react-icons/go'

import { DropDown } from '@components'

export const OptionsDropdown: React.FC = () => {
  return (
    <DropDown>
      <DropDown.Trigger>
        <div>
          <GoKebabHorizontal className="cursor-pointer hover:text-blue-600 transition-all" />
        </div>
      </DropDown.Trigger>
      <DropDown.Content align="end">
        <DropDown.Item label="Editar" icon={GoPencil} />
        <DropDown.Item label="Excluir" icon={GoTrash} />
      </DropDown.Content>
    </DropDown>
  )
}
