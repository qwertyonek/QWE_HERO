import { useState, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AvatarColor = 'default' | 'accent' | 'success' | 'warning' | 'danger'

export interface AvatarProps extends ComponentProps<'span'> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'soft'
  color?: AvatarColor
  src?: string
  alt?: string
  fallback?: ReactNode
}

export function Avatar({ size = 'md', variant = 'default', color = 'default', src, alt = '', fallback, className, children, ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false)

  return (
    <span data-slot="avatar" className={cn('avatar', `avatar--${size}`, variant === 'soft' && 'avatar--soft', className)} {...props}>
      {children ?? (
        <>
          {(!src || failed) && (
            <span data-slot="avatar-fallback" className={cn('avatar__fallback', `avatar__fallback--${color}`)}>
              {fallback}
            </span>
          )}
          {src && !failed && <img data-slot="avatar-image" className="avatar__image" src={src} alt={alt} onError={() => setFailed(true)} />}
        </>
      )}
    </span>
  )
}
