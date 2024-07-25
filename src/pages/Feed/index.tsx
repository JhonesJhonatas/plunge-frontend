import React from 'react'

import { CreatePost } from '@/pages/Feed/components/create-post'

export const Feed: React.FC = () => {
  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800">
          <span>Left</span>
        </div>
      </div>
      <div className="w-6/12">
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
