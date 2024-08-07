import React, { HTMLAttributes } from 'react'

import { tv, VariantProps } from 'tailwind-variants'

import avatarPlaceholder from '@/assets/placeholders/avatar-placeholder.jpg'

const avatar = tv({
  base: 'rounded-full',
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xlg: 'w-32 h-32',
    },
    haveAction: {
      true: 'cursor-pointer hover:scale-110 transition-all',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarStyle = VariantProps<typeof avatar>

interface AvatarProps extends AvatarStyle, HTMLAttributes<HTMLDivElement> {
  avatarUrl?: string
}

export const Avatar: React.FC<AvatarProps> = ({ size, avatarUrl, ...rest }) => {
  return (
    <div {...rest}>
      <img
        src={avatarUrl || avatarPlaceholder}
        alt="Avatar"
        className={avatar({ size, haveAction: !!rest.onClick })}
      />
    </div>
  )
}
