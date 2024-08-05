import React, { ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { Trigger } from '@/components/Modal/components/trigger'
import { Content } from '@/components/Modal/components/content'

interface ModalProps {
  children: ReactNode
  open?: boolean
}

interface ModalComponent extends React.FC<ModalProps> {
  Trigger: typeof Trigger
  Content: typeof Content
  Close: typeof Dialog.Close
}

export const Modal: ModalComponent = ({ children, open }) => {
  return <Dialog.Root open={open}>{children}</Dialog.Root>
}

Modal.Trigger = Trigger
Modal.Content = Content
Modal.Close = Dialog.Close
