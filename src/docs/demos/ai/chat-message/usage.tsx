import { ChatMessage, ChatMessageActions } from '@/components/qwe-hero/ai'

const answer = 'Compound components let you compose message layout explicitly while keeping state in your app layer.'

export default function ChatMessageUsage() {
  return (
    <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
      <ChatMessage.User>
        <ChatMessage.Bubble>
          <ChatMessage.Content>Can you explain how compound components help AI chat UIs stay SDK-agnostic?</ChatMessage.Content>
        </ChatMessage.Bubble>
      </ChatMessage.User>
      <ChatMessage.Assistant>
        <ChatMessage.Avatar alt="Assistant" fallback="AI" />
        <ChatMessage.Body>
          <ChatMessage.Content>{answer}</ChatMessage.Content>
          <ChatMessage.Actions>
            <ChatMessageActions.Copy value={answer} />
            <ChatMessageActions.ThumbsUp />
            <ChatMessageActions.ThumbsDown />
            <ChatMessageActions.Regenerate />
          </ChatMessage.Actions>
        </ChatMessage.Body>
      </ChatMessage.Assistant>
    </div>
  )
}
