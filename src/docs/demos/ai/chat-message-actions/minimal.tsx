import { ChatMessage, ChatMessageActions } from '@/components/qwe-hero/ai'

const text = 'Minimal action set for compact layouts.'

export default function ChatMessageActionsMinimal() {
  return (
    <ChatMessage.Assistant>
      <ChatMessage.Avatar alt="Assistant" fallback="AI" />
      <ChatMessage.Body>
        <ChatMessage.Content>{text}</ChatMessage.Content>
        <ChatMessage.Actions>
          <ChatMessageActions.Copy value={text} />
          <ChatMessageActions.More />
        </ChatMessage.Actions>
      </ChatMessage.Body>
    </ChatMessage.Assistant>
  )
}
