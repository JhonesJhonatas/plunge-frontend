import React, { useEffect, useMemo } from 'react'

import { Avatar, CreatePost, ExpandableBox, Post } from '@components'

import { useParams } from 'react-router-dom'
import { useGetProfileData } from '@/modules/user'

export const Profile: React.FC = () => {
  const { nickName } = useParams()
  const {
    user,
    handlers: { handleGetProfileData },
  } = useGetProfileData()

  const posts = useMemo(() => {
    if (!user) return []

    return user.posts.map((post) => {
      return {
        ...post,
        author: {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      }
    })
  }, [user])

  useEffect(() => {
    handleGetProfileData({ nickName: nickName as string })
  }, [handleGetProfileData, nickName])

  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-4">
          <div className="w-full flex items-center justify-center">
            <Avatar size="xlg" />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <span className="font-bold text-lg">{user?.name}</span>
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
          {posts.map((post) => {
            return <Post key={post.id} {...post} />
          })}
        </div>
      </div>
      <div className="w-3/12 flex flex-col gap-4">
        <ExpandableBox title="Seguidores">
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
        </ExpandableBox>
        <ExpandableBox title="Seguindo">
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
        </ExpandableBox>
      </div>
    </div>
  )
}
