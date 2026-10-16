import { ChatMessage, ChatMessageActions } from '@/components/qwe-hero/ai'

const text = 'Assistant responses can expose quick actions beneath the message body.'

export default function ChatMessageActionsUsage() {
  return (
    <ChatMessage.Assistant>
      <ChatMessage.Avatar alt="Assistant" fallback="AI" />
      <ChatMessage.Body>
        <ChatMessage.Content>{text}</ChatMessage.Content>
        <ChatMessage.Actions>
          <ChatMessageActions.Copy value={text} />
          <ChatMessageActions.ThumbsUp />
          <ChatMessageActions.ThumbsDown />
          <ChatMessageActions.Regenerate />
          <ChatMessageActions.More />
        </ChatMessage.Actions>
      </ChatMessage.Body>
    </ChatMessage.Assistant>
  )
}
