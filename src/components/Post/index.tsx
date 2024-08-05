import React, { useCallback } from 'react'

import { tv } from 'tailwind-variants'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'

import {
  GoBookmark,
  GoComment,
  GoPaperAirplane,
  GoPencil,
} from 'react-icons/go'

import { Avatar } from '@components'

import { DeletePostProps, Post as PostType } from '@post'
import { RatePostProps } from '@like'
import { useAuth } from '@user'

import { OptionsDropdown } from './components/options-dropdown'
import { LikesModal } from './components/likes-modal'
import { PostModal } from './components/post-modal'

const likeButton = tv({
  base: 'flex items-center gap-2 cursor-pointer hover:scale-110 transition-all',
  variants: {
    userAleradyLiked: {
      true: 'text-blue-600 hover:text-zinc-50',
      false: 'text-zinc-50 hover:text-blue-600',
    },
  },
})

interface PostProps {
  post: PostType
  handlers: {
    handleRatePost: (params: RatePostProps) => void
    handleDeletePost: (params: DeletePostProps) => void
  }
}

export const Post: React.FC<PostProps> = ({
  post: { author, ...post },
  handlers: { handleDeletePost, handleRatePost },
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const {
    content,
    mediaUrl,
    createdAt,
    updatedAt,
    likesCount,
    userAleradyLiked,
    userCanLike,
    likes,
  } = post

  const hasBenUpdated = createdAt !== updatedAt

  const LikeIcon = userAleradyLiked ? FaThumbsUp : FaRegThumbsUp

  const hatePost = useCallback(() => {
    if (userCanLike) {
      handleRatePost({ postId: post.id, like: !userAleradyLiked })
    }
  }, [handleRatePost, post.id, userAleradyLiked, userCanLike])

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
          <div className="flex items-center gap-2">
            <PostModal post={{ author, ...post }} />
            <OptionsDropdown
              handleDeletePost={handleDeletePost}
              isAuthor={user.id === author.id}
              authorNickName={author.nickName}
              postId={post.id}
            />
          </div>
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
        <span className="break-words">{content}</span>
        {mediaUrl ? (
          <img src={mediaUrl} alt="" className="max-h-52 rounded" />
        ) : null}
      </div>
      <LikesModal likesCount={likesCount} likes={likes} />
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
