import type { ComponentProps } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface LoaderProps extends ComponentProps<'span'> {
  size?: Size
}

interface DotsProps extends LoaderProps {
  /** Announces the loader as a live status; omit for a purely decorative indicator. */
  label?: string
}

function Dots({ size = 'md', label, className, ...props }: DotsProps) {
  return (
    <span
      data-slot="chat-loader-dots"
      {...(label ? { role: 'status', 'aria-label': label } : { 'aria-hidden': true })}
      className={cn('chat-loader__dots', `chat-loader__dots--${size}`, className)}
      {...props}
    >
      <span className="chat-loader__dot" />
      <span className="chat-loader__dot" />
      <span className="chat-loader__dot" />
      {label && <span className="sr-only">{label}</span>}
    </span>
  )
}

function Pulse({ size = 'md', className, ...props }: LoaderProps) {
  return <span data-slot="chat-loader-pulse" aria-hidden="true" className={cn('chat-loader__pulse', `chat-loader__pulse--${size}`, className)} {...props} />
}

function LoaderSpinner({ size = 'md', className, ...props }: LoaderProps) {
  return (
    <span data-slot="chat-loader-spinner" aria-hidden="true" className={cn('chat-loader__spinner', className)} {...props}>
      <Spinner size={size} />
    </span>
  )
}

interface SkeletonPartProps extends ComponentProps<'div'> {
  size?: Size
}

function SkeletonAvatar({ size = 'md', className, ...props }: SkeletonPartProps) {
  return (
    <div data-slot="chat-loader-skeleton-avatar" className={cn('chat-loader__skeleton-avatar', size !== 'md' && `chat-loader__skeleton-avatar--${size}`, className)} {...props} />
  )
}

function SkeletonBlock({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-loader-skeleton-block" className={cn('chat-loader__skeleton-block', className)} {...props} />
}

function SkeletonLine({ size = 'md', className, ...props }: SkeletonPartProps) {
  return (
    <div data-slot="chat-loader-skeleton-line" className={cn('chat-loader__skeleton-line', size !== 'md' && `chat-loader__skeleton-line--${size}`, className)} {...props} />
  )
}

interface SkeletonProps extends ComponentProps<'div'> {
  size?: Size
  /** Number of text lines. */
  lines?: number
  hideAvatar?: boolean
}

/** Chat-message-shaped skeleton: avatar + text lines (100% / 85% / 65%). */
function Skeleton({ size = 'md', lines = 3, hideAvatar, className, children, ...props }: SkeletonProps) {
  return (
    <div data-slot="chat-loader-skeleton" role="status" aria-busy="true" aria-label="Loading response" className={cn('chat-loader__skeleton', className)} {...props}>
      {children ?? (
        <>
          {!hideAvatar && <SkeletonAvatar size={size} />}
          <SkeletonBlock>
            {Array.from({ length: lines }, (_, i) => (
              <SkeletonLine key={i} size={size} />
            ))}
          </SkeletonBlock>
        </>
      )}
    </div>
  )
}

export const ChatLoader = {
  Dots,
  Pulse,
  Spinner: LoaderSpinner,
  Skeleton,
  SkeletonAvatar,
  SkeletonBlock,
  SkeletonLine,
}
