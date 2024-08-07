import React from 'react'

import { Avatar, Button, CreatePost, ExpandableBox, Post } from '@components'

import { GoPersonAdd } from 'react-icons/go'
import { useProfileContent } from './hooks/use-profile-content'
import { useNavigate } from 'react-router-dom'

export const Profile: React.FC = () => {
  const navigate = useNavigate()

  const {
    profileData,
    isProfileOwner,
    handlers: {
      handleCreatePost,
      handleDeletePost,
      handleRatePost,
      handleRequestFollow,
      handleAcceptFollow,
    },
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
                  <GoPersonAdd
                    onClick={() =>
                      handleRequestFollow({ followingId: profileData.user.id })
                    }
                  />
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
        <ExpandableBox title="Seguidores" defaultOpen>
          <div className="flex gap-2">
            {profileData?.follows?.acceptedFollowing?.map((follow) => {
              return (
                <Avatar
                  key={follow.id}
                  size="sm"
                  avatarUrl={follow.user.avatarUrl}
                  onClick={() => navigate(`/profile/${follow.user.nickName}`)}
                />
              )
            })}
          </div>
        </ExpandableBox>
        <ExpandableBox title="Seguindo" defaultOpen>
          <div className="flex gap-2">
            {profileData?.follows?.acceptedFollowers?.map((follow) => {
              return (
                <Avatar
                  key={follow.id}
                  size="sm"
                  avatarUrl={follow.user.avatarUrl}
                  onClick={() => navigate(`/profile/${follow.user.nickName}`)}
                />
              )
            })}
          </div>
        </ExpandableBox>
        {isProfileOwner && (
          <ExpandableBox title="Pendentes" defaultOpen>
            <div className="flex flex-col gap-4">
              {profileData?.follows?.pendingFollowers?.map((follow) => {
                return (
                  <div
                    key={follow.id}
                    className="flex items-center justify-between bg-slate-700 py-1 px-2 rounded"
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        size="sm"
                        avatarUrl={follow.user.avatarUrl}
                        onClick={() =>
                          navigate(`/profile/${follow.user.nickName}`)
                        }
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">
                          {follow.user.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {follow.user.nickName}
                        </span>
                      </div>
                    </div>

                    <Button width="xs">Cancelar Solicitação</Button>
                  </div>
                )
              })}
            </div>
          </ExpandableBox>
        )}
        {isProfileOwner && (
          <ExpandableBox title="Solicitações" defaultOpen>
            <div className="flex flex-col gap-2">
              {profileData?.follows?.pendingFollowing?.map((follow) => {
                return (
                  <div
                    key={follow.id}
                    className="flex items-center justify-between bg-slate-700 py-1 px-2 rounded"
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar
                        size="sm"
                        avatarUrl={follow.user.avatarUrl}
                        onClick={() =>
                          navigate(`/profile/${follow.user.nickName}`)
                        }
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">
                          {follow.user.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {follow.user.nickName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button width="xs">Recusar</Button>
                      <Button
                        width="xs"
                        onClick={() => handleAcceptFollow({ id: follow.id })}
                      >
                        Aceitar
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </ExpandableBox>
        )}
      </div>
    </div>
  )
}
