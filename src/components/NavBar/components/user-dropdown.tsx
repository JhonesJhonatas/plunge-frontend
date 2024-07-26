import React from 'react'

import { useAuth } from '@user'

import { Avatar, DropDown } from '@components'
import { GoChevronDown, GoPerson, GoSignOut } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

export const UserDropDown: React.FC = () => {
  const navigate = useNavigate()

  const {
    handlers: { handleSignOut },
    user,
  } = useAuth()

  return (
    <DropDown>
      <DropDown.Trigger>
        <div className="relative">
          <Avatar size="sm" />
          <div className="bg-slate-600 rounded-full h-3 w-3 absolute bottom-0 right-0 flex flex-col items-center justify-center hover:scale-110 transition-all">
            <GoChevronDown size={10} />
          </div>
        </div>
      </DropDown.Trigger>

      <DropDown.Content>
        {user ? (
          <div className="flex gap-2 p-2 rounded border-2 items-center border-slate-500">
            <Avatar size="sm" />
            <div className="flex flex-col ">
              <span className="font-bold text-sm">{user.name}</span>
              <span className="text-xs">{user.email}</span>
            </div>
          </div>
        ) : null}
        <DropDown.Item
          label="Meu Perfil"
          icon={GoPerson}
          onClick={() => navigate(`/profile/${user.id}`)}
        />
        <DropDown.Item label="Sair" icon={GoSignOut} onClick={handleSignOut} />
      </DropDown.Content>
    </DropDown>
  )
}
