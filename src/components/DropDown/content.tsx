import React, { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface ContentProps {
  children: ReactNode
  align?: 'start' | 'end' | 'center'
}

export const Content: React.FC<ContentProps> = ({
  children,
  align = 'center',
}) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="flex flex-col gap-2 min-w-[220px] bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-500 rounded p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
        align={align}
      >
        {children}
        <DropdownMenu.Arrow className="fill-slate-600" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}
