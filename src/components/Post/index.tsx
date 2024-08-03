import React, { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

import { Avatar } from '@components'

import { Post as PostType } from '@post'
import { useRatePost } from '@like'

import {
  GoBookmark,
  GoComment,
  GoPaperAirplane,
  GoPencil,
} from 'react-icons/go'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import { tv } from 'tailwind-variants'
import { OptionsDropdown } from './components/options-dropdown'

const likeButton = tv({
  base: 'flex items-center gap-2 cursor-pointer hover:scale-110 transition-all',
  variants: {
    userAleradyLiked: {
      true: 'text-blue-600 hover:text-zinc-50',
      false: 'text-zinc-50 hover:text-blue-600',
    },
  },
})

interface PostProps extends PostType {}

export const Post: React.FC<PostProps> = ({ author, ...rest }) => {
  const navigate = useNavigate()
  const {
    handlers: { handleRatePost },
  } = useRatePost()

  const {
    content,
    mediaUrl,
    createdAt,
    updatedAt,
    likesCount,
    userAleradyLiked,
    userCanLike,
  } = rest

  const hasBenUpdated = createdAt !== updatedAt

  const LikeIcon = userAleradyLiked ? FaThumbsUp : FaRegThumbsUp

  const hatePost = useCallback(() => {
    if (userCanLike) {
      handleRatePost({ postId: rest.id, like: !userAleradyLiked })
    }
  }, [handleRatePost, rest.id, userAleradyLiked, userCanLike])

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded p-2 border-2 border-slate-900 flex flex-col gap-2">
      <div className="flex justify-between border-b-2 border-zinc-900 pb-4">
        <div className="flex items-start gap-2">
          <div
            onClick={() => navigate(`/profile/${author.nickName}`)}
            className="cursor-pointer"
          >
            <Avatar avatarUrl={author.avatarUrl} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{author.name}</span>
            <span className="text-zinc-500">{author.nickName}</span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <OptionsDropdown />
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500">
              {format(new Date(createdAt), 'dd/MM/yyyy')}
            </span>
            {hasBenUpdated ? (
              <span className="text-zinc-500 flex items-center gap-1">
                | <GoPencil /> Editado
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-b-2 border-zinc-900 pb-4">
        <span>{content}</span>
        {mediaUrl ? (
          <img src={mediaUrl} alt="" className="max-h-52 rounded" />
        ) : null}
      </div>
      <div className="p-2 flex gap-1 text-zinc-600 hover:text-zinc-500 cursor-pointer transition-all">
        <span className="font-bold">{likesCount}</span>
        <span>Curtidas</span>
      </div>
      <div className="w-full rounded-full border-2 border-slate-800 flex items-center justify-between gap-2 pr-6">
        <div
          onClick={hatePost}
          className="flex items-center gap-4 py-3 px-8 rounded-full border-2 border-slate-800 bg-slate-900 w-fit"
        >
          <div className={likeButton({ userAleradyLiked })}>
            <LikeIcon size={18} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <GoComment />
          <span>Comentários</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <GoBookmark />
          <span>Salvar</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <GoPaperAirplane />
          <span>Compartilhar</span>
        </div>
      </div>
    </div>
  )
}
