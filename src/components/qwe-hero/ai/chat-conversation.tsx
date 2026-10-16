import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ChatListView } from './chat-list-view'

export interface ChatConversationProps extends Omit<ComponentProps<'div'>, 'children'> {
  /** Messages, typically <ChatMessage /> elements. */
  children?: ReactNode
  header?: ReactNode
  /** Input area pinned to the bottom, typically <PromptInput />. */
  composer?: ReactNode
  /** Shown instead of the list when there are no messages. */
  emptyState?: ReactNode
  /** Max width of the message column and composer. */
  contentClassName?: string
}

/** Full chat session frame: header, auto-scrolling message log and a pinned composer. */
export function ChatConversation({
  children,
  header,
  composer,
  emptyState,
  className,
  contentClassName = 'mx-auto w-full max-w-3xl',
  ...props
}: ChatConversationProps) {
  return (
    <div className={cn('flex h-full min-h-0 flex-col bg-background', className)} {...props}>
      {header && <div className="shrink-0 border-b">{header}</div>}
      <ChatListView className="flex-1" contentClassName={contentClassName} emptyState={emptyState}>
        {children}
      </ChatListView>
      {composer && (
        <div className="relative shrink-0 px-4 pb-4">
          <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background to-transparent" />
          <div className={contentClassName}>{composer}</div>
        </div>
      )}
    </div>
  )
}
