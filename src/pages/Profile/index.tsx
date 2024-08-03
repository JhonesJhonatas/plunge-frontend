import React, { useEffect, useMemo } from 'react'

import { Avatar, Button, CreatePost, ExpandableBox, Post } from '@components'

import { useParams } from 'react-router-dom'
import { useAuth, useGetProfileData } from '@/modules/user'
import { GoPersonAdd } from 'react-icons/go'

export const Profile: React.FC = () => {
  const { nickName } = useParams()
  const { user } = useAuth()
  const {
    profileData,
    handlers: { handleGetProfileData },
  } = useGetProfileData()

  const isOwnProfile = useMemo(() => {
    return nickName === user.nickName
  }, [nickName, user.nickName])

  useEffect(() => {
    handleGetProfileData({ nickName: nickName as string })
  }, [handleGetProfileData, nickName])

  return (
    <div className="flex justify-between gap-4">
      <div className="w-3/12">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-4">
          <div className="w-full flex items-center justify-center">
            <Avatar size="xlg" avatarUrl={user.avatarUrl} />
          </div>
          <div className="w-full flex flex-col gap-1 items-center justify-center">
            <span className="font-bold text-lg">{profileData?.user?.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm p-2 rounded bg-slate-800">
                {profileData?.user?.nickName}
              </span>
              {!isOwnProfile ? (
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
        <CreatePost />
        <div className="flex flex-col gap-4 h-[calc(100vh-15rem)] overflow-auto no-scrollbar">
          {profileData?.posts?.map((post) => {
            return <Post key={post.id} {...post} />
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
        {isOwnProfile && (
          <ExpandableBox title="Pendentes">
            <div className="flex flex-col gap-2"></div>
          </ExpandableBox>
        )}
        {isOwnProfile && (
          <ExpandableBox title="Solicitações">
            <div className="flex flex-col gap-2"></div>
          </ExpandableBox>
        )}
      </div>
    </div>
  )
}
