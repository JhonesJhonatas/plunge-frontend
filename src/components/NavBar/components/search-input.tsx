import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { tv } from 'tailwind-variants'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { GoPerson, GoPersonAdd, GoVersions } from 'react-icons/go'

import { useAuth, useSearchUser } from '@user'
import { Avatar, Button } from '@components'
import { useSearchPost } from '@post'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  search: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

const searchOption = tv({
  base: 'cursor-pointer p-1 rounded transition-all',
  variants: {
    active: {
      true: 'bg-blue-500',
      false: 'bg-slate-500 hover:bg-slate-400',
    },
  },
})

const optionsBox = tv({
  base: 'bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-500 rounded p-2 w-full top-12 flex flex-col gap-2',
  variants: {
    isOpen: {
      true: 'absolute',
      false: 'hidden',
    },
  },
})

type Properties = {
  searchType: 'user' | 'post'
  isOpen: boolean
}

interface SearchInputProps {
  placeholder?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    users,
    handlers: { handleSearchUser },
  } = useSearchUser()
  const {
    posts,
    handlers: { handleSearchPost },
  } = useSearchPost()
  const { register, watch } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const [properties, setProperties] = useState<Properties>({
    searchType: 'user',
    isOpen: false,
  } as Properties)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const optionsRef = useRef<HTMLDivElement | null>(null)

  const handleSetProperties = useCallback((params: Partial<Properties>) => {
    setProperties((oldState) => {
      return {
        ...oldState,
        ...params,
      }
    })
  }, [])

  const handleRequestFollow = useCallback(
    (followingId: string) => {
      console.log('---------- DEBUG ----------')
      console.log(user?.id, followingId)
      console.log('---------- DEBUG ----------')
    },
    [user?.id],
  )

  const searchInput = watch('search')

  const emptyMessage = useMemo(() => {
    if (!users && !posts) {
      return (
        <span className="text-zinc-400">Comece a digitar para procurar...</span>
      )
    }

    if (users && users.length === 0 && posts && posts.length === 0)
      return (
        <span className="text-zinc-400">
          {'Não consegui encontrar nada :('}
        </span>
      )

    return (
      <span className="text-zinc-400">{'Não consegui encontrar nada :('}</span>
    )
  }, [posts, users])

  const options = useMemo(() => {
    if (properties.searchType === 'user' && users && users.length > 0) {
      return users.map((user) => {
        return (
          <div
            onClick={() => navigate(`/profile/${user.nickName}`)}
            className="w-full flex items-center gap-2 justify-between py-1 px-2 cursor-pointer outline-none bg-slate-500 bg-opacity-30 hover:bg-opacity-55 transition-all rounded"
            key={user.id}
          >
            <div className="flex items-center gap-2">
              <Avatar size="sm" avatarUrl={user.avatarUrl} />
              <div className="flex flex-col">
                <span className="font-bold">{user.name}</span>
                <span className="text-zinc-400 text-sm">Resumo da Bio</span>
              </div>
            </div>
            <Button width="fit">
              <GoPersonAdd onClick={() => handleRequestFollow(user.id)} />
            </Button>
          </div>
        )
      })
    }

    if (properties.searchType === 'post' && posts && posts.length > 0) {
      return posts.map((post) => {
        return (
          <div
            className="w-full flex items-center gap-2 py-1 px-2 cursor-pointer outline-none bg-slate-500 bg-opacity-30 hover:bg-opacity-55 transition-all rounded"
            key={post.id}
          >
            <div>
              <span className="font">{post.content}</span>
            </div>
          </div>
        )
      })
    }

    return emptyMessage
  }, [
    emptyMessage,
    handleRequestFollow,
    navigate,
    posts,
    properties.searchType,
    users,
  ])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        handleSetProperties({
          isOpen: false,
        })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleSetProperties])

  useEffect(() => {
    if (
      searchInput &&
      searchInput.length > 3 &&
      properties.searchType === 'user'
    ) {
      handleSearchUser({ name: searchInput })
    }

    if (
      searchInput &&
      searchInput.length > 3 &&
      properties.searchType === 'post'
    ) {
      handleSearchPost({ content: searchInput })
    }
  }, [
    handleSearchPost,
    handleSearchUser,
    properties.searchType,
    searchInput,
    watch,
  ])

  useEffect(() => {
    if (searchInput && searchInput.length > 0) {
      handleSetProperties({ isOpen: true })
      return
    }

    handleSetProperties({ isOpen: false })
  }, [handleSetProperties, searchInput])

  return (
    <div className="flex items-center relative">
      <div className="flex items-center" ref={inputRef}>
        <input
          {...register('search')}
          type="text"
          placeholder={placeholder}
          className="w-full p-1 rounded-l bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-600 outline-none"
        />
        <div className="flex gap-1 items-center bg-slate-600 h-9 rounded-r px-1">
          <div
            onClick={() => handleSetProperties({ searchType: 'user' })}
            className={searchOption({
              active: properties.searchType === 'user',
            })}
          >
            <GoPerson />
          </div>
          <div
            onClick={() => handleSetProperties({ searchType: 'post' })}
            className={searchOption({
              active: properties.searchType === 'post',
            })}
          >
            <GoVersions />
          </div>
        </div>
      </div>
      <div
        ref={optionsRef}
        className={optionsBox({ isOpen: properties.isOpen })}
      >
        {options}
      </div>
    </div>
  )
}
