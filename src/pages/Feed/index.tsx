import React from 'react'

import { CreatePost } from '@/pages/Feed/components/create-post'

import { useSearchPost } from '@post'
import { Post } from './components/post'

export const Feed: React.FC = () => {
  const { posts } = useSearchPost()

  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800">
          <span>Left</span>
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
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800">
          <span>Right</span>
        </div>
      </div>
    </div>
  )
}
