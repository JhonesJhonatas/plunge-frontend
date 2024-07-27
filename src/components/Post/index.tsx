import React from 'react'

import { Avatar } from '@components'

import { Post as PostType } from '@post'
import {
  GoBookmark,
  GoComment,
  GoPaperAirplane,
  GoThumbsdown,
  GoThumbsup,
} from 'react-icons/go'

interface PostProps extends PostType {}

export const Post: React.FC<PostProps> = ({
  content,
  mediaUrl,
  ups,
  author,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded p-2 border-2 border-slate-900 flex flex-col gap-2">
      <div className="flex justify-between border-b-2 border-zinc-900 pb-4">
        <div className="flex items-start gap-2">
          <Avatar />
          <div className="flex flex-col">
            <span className="font-bold">{author.name}</span>
            <span className="text-zinc-500">Resumo da bio...</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b-2 border-zinc-900 pb-4">
        <span>{content}</span>
        {mediaUrl ? (
          <img src={mediaUrl} alt="" className="max-h-52 rounded" />
        ) : null}
      </div>
      <div className="p-2 flex gap-1">
        <span className="text-zinc-600 font-bold">{ups}</span>
        <span className="text-zinc-600">Curtidas</span>
      </div>
      <div className="w-full rounded-full border-2 border-slate-800 flex items-center justify-between gap-2 pr-6">
        <div className="flex items-center gap-4 py-3 px-4 rounded-full border-2 border-slate-800 bg-slate-900 w-fit">
          <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-all">
            <GoThumbsup />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-all">
            <GoThumbsdown />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <GoComment />
          <span>Comentários</span>
        </div>
        <div className="flex items-center gap-2">
          <GoBookmark />
          <span>Salvar</span>
        </div>
        <div className="flex items-center gap-2">
          <GoPaperAirplane />
          <span>Compartilhar</span>
        </div>
      </div>
    </div>
  )
}
