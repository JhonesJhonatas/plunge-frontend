import React, { useEffect } from 'react'

import { Avatar, CreatePost, Post } from '@components'
import { useSearchPost } from '@/modules/post'

import { useParams } from 'react-router-dom'

export const Profile: React.FC = () => {
  const { userId } = useParams()
  const {
    posts,
    handlers: { handleSearchPost },
  } = useSearchPost()

  useEffect(() => {
    handleSearchPost({ userId })
  }, [handleSearchPost, userId])

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
        <div className="flex flex-col gap-4 h-[calc(100vh-15rem)] overflow-auto no-scrollbar">
          {posts?.map((post) => {
            return <Post key={post.id} {...post} />
          })}
        </div>
      </div>
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">Amigos</span>
            <span className="text-zinc-500">(102)</span>
          </div>
          <div className="flex items-center justify-between">
            <Avatar size="sm" />
            <Avatar size="sm" />
            <Avatar size="sm" />
            <Avatar size="sm" />
            <Avatar size="sm" />
            <Avatar size="sm" />
            <Avatar size="sm" />
            <Avatar size="sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
