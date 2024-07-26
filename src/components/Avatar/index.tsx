import React from 'react'

import avatarPlaceholder from '@assets/placeholders/avatar-placeholder.jpg'
import { tv, VariantProps } from 'tailwind-variants'

const avatar = tv({
  base: 'rounded-full',
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xlg: 'w-32 h-32',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarStyle = VariantProps<typeof avatar>

interface AvatarProps extends AvatarStyle {}

export const Avatar: React.FC<AvatarProps> = ({ size }) => {
  return (
    <div>
      <img src={avatarPlaceholder} alt="Avatar" className={avatar({ size })} />
    </div>
  )
}
