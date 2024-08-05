import React, { useCallback } from 'react'

import { z } from 'zod'
import { GoFileMedia } from 'react-icons/go'

import { Avatar, Button, Form } from '@components'
import { useCreatePost } from '@post'
import { useAuth } from '@/modules/user'

const formSchema = z.object({
  content: z
    .string()
    .min(3, { message: 'O conteúdo deve ter no mínimo 3 caracteres' }),
})

type FormSchema = z.infer<typeof formSchema>

export const CreatePost: React.FC = () => {
  const {
    user: { avatarUrl },
  } = useAuth()
  const {
    loading,
    handlers: { handleCreatePost },
  } = useCreatePost()

  const handleSubmit = useCallback(
    ({ content }: FormSchema) => {
      handleCreatePost({
        content,
      })
    },
    [handleCreatePost],
  )

  return (
    <Form
      formSchema={formSchema}
      onSubmitForm={handleSubmit}
      resetOnSubmit
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded p-2 border-2 border-slate-800 flex flex-col gap-2"
    >
      <div className="flex items-start gap-2">
        <Avatar avatarUrl={avatarUrl} />
        <Form.CreatePostInput
          name="content"
          placeholder="No que está pensando?"
        />
      </div>
      <div className="w-full flex items-center justify-between border-t-2 pt-2 border-zinc-800">
        <div className="p-2 flex gap-2">
          <GoFileMedia />
        </div>
        <Button width="xs" loading={loading} loadingMessage="Publicando...">
          Publicar
        </Button>
      </div>
    </Form>
  )
}
