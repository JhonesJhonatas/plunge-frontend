import React from 'react'

import { Avatar, CreatePost } from '@components'

export const Profile: React.FC = () => {
  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-4">
          <div className="w-full flex items-center justify-center">
            <Avatar size="xlg" />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <span className="font-bold text-lg">Nome Usuario</span>
            <span className="text-zinc-500 text-center">
              Biografia mt doida e com bastante palavras, que ocupa bastante
              espaço.
            </span>
          </div>
        </div>
      </div>
      <div className="w-6/12 flex flex-col gap-4">
        <CreatePost />
      </div>
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800">
          <span>Right</span>
        </div>
      </div>
    </div>
  )
}
