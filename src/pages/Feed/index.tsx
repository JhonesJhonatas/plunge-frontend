import React, { useEffect } from 'react'

import { useSearchPost } from '@post'

import { Post, CreatePost, ExpandableBox } from '@components'

export const Feed: React.FC = () => {
  const {
    posts,
    handlers: { handleSearchPost },
  } = useSearchPost()

  useEffect(() => {
    handleSearchPost({})
  }, [handleSearchPost])

  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <ExpandableBox title="Em alta">
          <div></div>
        </ExpandableBox>
      </div>
      <div className="w-6/12 flex flex-col gap-4">
        <CreatePost />
        <div className="flex flex-col gap-4 h-[calc(100vh-16rem)] overflow-auto pr-1">
          {posts?.map((post) => {
            return <Post key={post.id} {...post} />
          })}
        </div>
      </div>
      <div className="w-3/12">
        <ExpandableBox title="Notícias">
          <div></div>
        </ExpandableBox>
      </div>
    </div>
  )
}
