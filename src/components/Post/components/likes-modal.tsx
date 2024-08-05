import React from 'react'

import { Avatar, Modal } from '@components'

import { PostLike } from '@post'
import { useNavigate } from 'react-router-dom'

interface LikesModalProps {
  likesCount: number
  likes: PostLike[]
}

export const LikesModal: React.FC<LikesModalProps> = ({
  likesCount,
  likes,
}) => {
  const navigate = useNavigate()

  return (
    <Modal>
      <Modal.Trigger>
        <div className="p-2 flex gap-1 text-zinc-600 hover:text-zinc-500 cursor-pointer transition-all">
          <span className="font-bold">{likesCount}</span>
          <span>Curtidas</span>
        </div>
      </Modal.Trigger>
      <Modal.Content size="xs">
        {likes && likes.length > 0 ? (
          <div className="flex flex-col gap-2">
            {likes.map((like) => (
              <div
                key={like.id}
                onClick={() => navigate(`/profile/${like.user.nickName}`)}
                className="flex items-center gap-2 p-2 bg-slate-800 rounded cursor-pointer hover:bg-slate-700 transition-all"
              >
                <Avatar size="sm" avatarUrl={like.user.avatarUrl} />
                <div className="flex flex-col">
                  <span>{like.user.name}</span>
                  <span className="text-sm">{like.user.nickName}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-zinc-400">
              Seja o primeiro a curtir o post! ;D
            </span>
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}
