import React from 'react'

import { TbExternalLink } from 'react-icons/tb'

import { Avatar, Modal } from '@components'
import { GoBookmark, GoComment, GoPaperAirplane, GoX } from 'react-icons/go'
import { LikesModal } from './likes-modal'
import { tv } from 'tailwind-variants'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

import { Post } from '@post'

const likeButton = tv({
  base: 'flex items-center gap-2 cursor-pointer hover:scale-110 transition-all',
  variants: {
    userAleradyLiked: {
      true: 'text-blue-600 hover:text-zinc-50',
      false: 'text-zinc-50 hover:text-blue-600',
    },
  },
})

interface PostModalProps {
  post: Post
}

export const PostModal: React.FC<PostModalProps> = ({
  post: { author, ...rest },
}) => {
  const { userAleradyLiked, content, likesCount, likes, mediaUrl } = rest

  const LikeIcon = userAleradyLiked ? FaThumbsUp : FaRegThumbsUp

  return (
    <Modal>
      <Modal.Trigger>
        <div className="flex items-center gap-2">
          <TbExternalLink className="cursor-pointer text-zinc-600 hover:text-zinc-400 transition-all" />
        </div>
      </Modal.Trigger>
      <Modal.Content size="sm">
        <div className="flex items-start justify-between pb-4 border-b-2 border-slate-800">
          <div className="flex items-center gap-2">
            <Avatar />
            <div className="flex flex-col">
              <span className="font-bold">{author.name}</span>
              <span className="text-sm text-zinc-300">{author.nickName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Modal.Close asChild>
              <GoX className="cursor-pointer" />
            </Modal.Close>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-4 border-b-2 border-slate-800 pb-4">
          <span className="break-words">{content}</span>
          {mediaUrl ? (
            <img src={mediaUrl} alt="" className="max-h-52 rounded" />
          ) : null}
        </div>
        <LikesModal likesCount={likesCount} likes={likes} />
        <div className="w-full rounded-full border-2 border-slate-700 flex items-center justify-between gap-2 pr-6">
          <div
            onClick={() => {}}
            className="flex items-center gap-4 py-3 px-8 rounded-full border-2 border-slate-700 bg-slate-800 w-fit"
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
      </Modal.Content>
    </Modal>
  )
}
