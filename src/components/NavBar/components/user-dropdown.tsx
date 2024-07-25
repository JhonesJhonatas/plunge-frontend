import React from 'react'

import { useAuth } from '@user'

import { Avatar, DropDown } from '@components'
import { GoSignOut } from 'react-icons/go'

export const UserDropDown: React.FC = () => {
  const {
    handlers: { handleSignOut },
    user,
  } = useAuth()

  return (
    <DropDown>
      <DropDown.Trigger>
        <Avatar size="sm" />
      </DropDown.Trigger>

      <DropDown.Content>
        <div className="flex gap-2 p-2 rounded border-2 items-center border-slate-500">
          <Avatar size="sm" />
          <div className="flex flex-col ">
            <span className="font-bold text-sm">{user.name}</span>
            <span className="text-xs">{user.email}</span>
          </div>
        </div>
        <DropDown.Item label="Sair" icon={GoSignOut} onClick={handleSignOut} />
      </DropDown.Content>
    </DropDown>
  )
}
