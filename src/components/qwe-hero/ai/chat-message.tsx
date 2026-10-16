import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ChatRole = 'user' | 'assistant'

export interface ChatMessageProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  role: ChatRole
  children?: ReactNode
  /** Avatar element. Assistant gets a default mark; user shows none unless given. */
  avatar?: ReactNode
  name?: string
  timestamp?: string
  /** Rendered above the content (e.g. ChatAttachment list, ChainOfThought). */
  header?: ReactNode
  /** Toolbar under the message, e.g. <ChatMessageActions />. Revealed on hover. */
  actions?: ReactNode
  /** Keep actions visible instead of revealing them on hover. */
  persistentActions?: boolean
}

export function ChatAvatar({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-card text-xs font-medium [&_img]:size-full [&_img]:object-cover [&_svg]:size-3.5',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ChatMessage({
  role,
  children,
  avatar,
  name,
  timestamp,
  header,
  actions,
  persistentActions,
  className,
  ...props
}: ChatMessageProps) {
  const isUser = role === 'user'
  const avatarNode =
    avatar ?? (isUser ? null : <ChatAvatar className="bg-foreground text-background"><Sparkles /></ChatAvatar>)

  return (
    <motion.div
      data-role={role}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className={cn('group/message flex w-full gap-3', isUser && 'flex-row-reverse', className)}
      {...props}
    >
      {avatarNode}
      <div className={cn('flex min-w-0 flex-col gap-1.5', isUser ? 'max-w-[85%] items-end' : 'flex-1 items-start')}>
        {(name || timestamp) && (
          <div className="flex items-baseline gap-2 text-xs">
            {name && <span className="font-medium">{name}</span>}
            {timestamp && <time className="text-muted-foreground">{timestamp}</time>}
          </div>
        )}
        {header}
        {children !== undefined && (
          <div
            className={cn(
              'min-w-0 text-sm leading-7',
              isUser ? 'rounded-2xl rounded-br-md bg-muted px-4 py-2.5 whitespace-pre-wrap' : 'w-full',
            )}
          >
            {children}
          </div>
        )}
        {actions && (
          <div
            className={cn(
              '-ml-1.5 transition-opacity duration-150',
              !persistentActions &&
                'opacity-0 group-hover/message:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100',
            )}
          >
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  )
}
