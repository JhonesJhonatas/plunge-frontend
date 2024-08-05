import React from 'react'

import { Avatar, Button, CreatePost, ExpandableBox, Post } from '@components'

import { GoPersonAdd } from 'react-icons/go'
import { useProfileContent } from './hooks/use-profile-content'

export const Profile: React.FC = () => {
  const {
    profileData,
    isProfileOwner,
    handlers: { handleCreatePost, handleDeletePost, handleRatePost },
  } = useProfileContent()

  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-4">
          <div className="w-full flex items-center justify-center">
            <Avatar size="xlg" avatarUrl={profileData?.user?.avatarUrl} />
          </div>
          <div className="w-full flex flex-col gap-1 items-center justify-center">
            <span className="font-bold text-lg">{profileData?.user?.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm p-2 rounded bg-slate-800">
                {profileData?.user?.nickName}
              </span>
              {!isProfileOwner ? (
                <Button width="fit">
                  <GoPersonAdd />
                </Button>
              ) : null}
            </div>
            <span className="text-zinc-500 text-center">
              {profileData?.user?.bio}
            </span>
          </div>
        </div>
      </div>
      <div className="w-6/12 flex flex-col gap-4">
        {isProfileOwner && <CreatePost handleCreatePost={handleCreatePost} />}
        <div className="flex flex-col gap-4 h-[calc(100vh-15rem)] overflow-auto pr-1">
          {profileData?.posts?.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                handlers={{ handleDeletePost, handleRatePost }}
              />
            )
          })}
        </div>
      </div>
      <div className="w-3/12 flex flex-col gap-4">
        <ExpandableBox title="Seguidores">
          <div className="flex items-center justify-between"></div>
        </ExpandableBox>
        <ExpandableBox title="Seguindo">
          <div className="flex items-center justify-between"></div>
        </ExpandableBox>
        {isProfileOwner && (
          <ExpandableBox title="Pendentes">
            <div className="flex flex-col gap-2"></div>
          </ExpandableBox>
        )}
        {isProfileOwner && (
          <ExpandableBox title="Solicitações">
            <div className="flex flex-col gap-2"></div>
          </ExpandableBox>
        )}
      </div>
    </div>
  )
}
