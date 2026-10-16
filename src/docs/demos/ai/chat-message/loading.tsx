import { ChatLoader, ChatMessage, TextShimmer } from '@/components/qwe-hero/ai'

export default function ChatMessageLoading() {
  return (
    <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
      <ChatMessage.User>
        <ChatMessage.Bubble>
          <ChatMessage.Content>What is the weather in San Francisco?</ChatMessage.Content>
        </ChatMessage.Bubble>
      </ChatMessage.User>
      <ChatMessage.Assistant>
        <ChatMessage.Avatar alt="Assistant" fallback="AI" />
        <ChatMessage.Body>
          <TextShimmer>Thinking...</TextShimmer>
          <ChatLoader.Dots label="Thinking..." />
        </ChatMessage.Body>
      </ChatMessage.Assistant>
      <ChatLoader.Skeleton />
    </div>
  )
}
