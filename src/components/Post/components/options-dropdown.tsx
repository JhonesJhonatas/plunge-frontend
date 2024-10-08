import React from 'react'

import {
  GoKebabHorizontal,
  GoPencil,
  GoPersonAdd,
  GoTrash,
} from 'react-icons/go'

import { DeletePostProps } from '@post'

import { DropDown } from '@components'

interface OptionsDropdownProps {
  isAuthor: boolean
  authorNickName: string
  postId: string
  handleDeletePost: (params: DeletePostProps) => void
}

export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  isAuthor,
  authorNickName,
  postId,
  handleDeletePost,
}) => {
  return (
    <DropDown>
      <DropDown.Trigger>
        <div>
          <GoKebabHorizontal className="cursor-pointer hover:text-blue-600 transition-all" />
        </div>
      </DropDown.Trigger>
      <DropDown.Content align="end">
        {isAuthor && <DropDown.Item label="Editar" icon={GoPencil} />}
        {isAuthor && (
          <DropDown.Item
            label="Excluir"
            icon={GoTrash}
            onClick={() => handleDeletePost({ id: postId })}
          />
        )}
        {!isAuthor && (
          <DropDown.Item
            label={`Seguir ${authorNickName}`}
            icon={GoPersonAdd}
          />
        )}
      </DropDown.Content>
    </DropDown>
  )
}
