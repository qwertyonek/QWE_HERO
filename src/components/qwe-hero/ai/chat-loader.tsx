import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { TextShimmer } from './text-shimmer'

export interface ChatLoaderProps extends ComponentProps<'div'> {
  variant?: 'dots' | 'pulse' | 'text'
  /** Status label shown next to the indicator (always shown for `text`). */
  label?: string
  size?: 'sm' | 'md'
}

const dotSize = { sm: 'size-1', md: 'size-1.5' }
const pulseSize = { sm: 'size-2.5', md: 'size-3' }

export function ChatLoader({ variant = 'dots', label, size = 'md', className, ...props }: ChatLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label ?? 'Модель отвечает'}
      className={cn('inline-flex items-center gap-2 text-sm', className)}
      {...props}
    >
      {variant === 'dots' && (
        <span className="flex items-center gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn('animate-dot rounded-full bg-muted-foreground', dotSize[size])}
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </span>
      )}
      {variant === 'pulse' && (
        <span className={cn('relative flex', pulseSize[size])} aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
          <span className="relative size-full rounded-full bg-accent" />
        </span>
      )}
      {(label || variant === 'text') && <TextShimmer className="font-medium">{label ?? 'Думаю…'}</TextShimmer>}
    </div>
  )
}
