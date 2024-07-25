import React from 'react'

import plungeLogo from '@assets/plunge-logo.svg'

import { NavItem } from '@/components/NavBar/components/NavItem'
import { UserDropDown } from '@/components/NavBar/components/user-dropdown'

import { GoCommentDiscussion, GoVersions } from 'react-icons/go'

export const NavBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 p-4 flex justify-center">
      <div className="w-[1400px] flex justify-between items-center">
        <div>
          <img src={plungeLogo} alt="Plunge Logo" className="w-8 h-8" />
        </div>
        <div className="flex items-center gap-6">
          <NavItem icon={GoVersions} label="Feed" path="/feed" />
          <NavItem
            icon={GoCommentDiscussion}
            label="Mensagens"
            path="/messaging"
            disabled
          />
        </div>
        <div>
          <UserDropDown />
        </div>
      </div>
    </div>
  )
}
