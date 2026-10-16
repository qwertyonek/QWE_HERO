import type { ComponentProps } from 'react'
import { Avatar, type AvatarProps } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

function Assistant({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-assistant" className={cn('chat-message--assistant', className)} {...props} />
}

function User({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-user" className={cn('chat-message--user', className)} {...props} />
}

interface ChatMessageAvatarProps extends AvatarProps {
  /** When false renders a same-size spacer, keeping grouped turns aligned. */
  show?: boolean
}

function MessageAvatar({ show = true, className, ...props }: ChatMessageAvatarProps) {
  if (!show) return <div data-slot="chat-message-avatar-spacer" className="chat-message__avatar-spacer" aria-hidden="true" />
  return (
    <div data-slot="chat-message-avatar" className="chat-message__avatar">
      <Avatar size="md" className={cn('size-8', className)} {...props} />
    </div>
  )
}

function Body({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-body" className={cn('chat-message__body', className)} {...props} />
}

function Bubble({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-bubble" className={cn('chat-message__bubble', className)} {...props} />
}

function Content({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-content" className={cn('chat-message__content', className)} {...props} />
}

function Media({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-media" className={cn('chat-message__media', className)} {...props} />
}

function Actions({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-actions" className={cn('chat-message__actions', className)} {...props} />
}

export const ChatMessage = {
  Assistant,
  User,
  Avatar: MessageAvatar,
  Body,
  Bubble,
  Content,
  Media,
  Actions,
}
