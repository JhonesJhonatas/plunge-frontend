import React from 'react'

import { Avatar } from '@components'

import { Post as PostType } from '@post'

interface PostProps extends PostType {}

export const Post: React.FC<PostProps> = ({ content, mediaUrl }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-2">
      <div className="flex justify-between border-b-2 border-zinc-800 pb-4">
        <div className="flex items-start gap-2">
          <Avatar />
          <div className="flex flex-col">
            <span className="font-bold">Nome</span>
            <span className="text-zinc-500">Descrição</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>Options</span>
          <span>Remove</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b-2 border-zinc-800 pb-4">
        <span>{content}</span>
        {mediaUrl ? (
          <img src={mediaUrl} alt="" className="max-h-52 rounded" />
        ) : null}
      </div>
    </div>
  )
}
