import React from 'react'

import { GoFileMedia } from 'react-icons/go'

import { Avatar, Button } from '@components'

export const CreatePost: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <Avatar />
        <input
          type="text"
          placeholder="No que está pensando?"
          className="bg-transparent border-b-2 border-slate-700 flex-1 outline-none p-2"
        />
      </div>
      <div className="w-full flex items-center justify-between border-t-2 pt-2 border-zinc-800">
        <div className="p-2 flex gap-2">
          <GoFileMedia />
        </div>
        <Button width="xs">Publicar</Button>
      </div>
    </div>
  )
}
