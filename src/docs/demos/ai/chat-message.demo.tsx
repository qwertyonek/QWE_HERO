import { ChatAvatar, ChatMessage, ChatMessageActions, Markdown } from '@/components/qwe-hero/ai'

const answer = `Короткий ответ: **да**, \`useSyncExternalStore\` подходит для подписки на \`hashchange\`.

Он корректно работает с concurrent rendering и не даёт «рваных» состояний.`

export default function ChatMessageDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <ChatMessage role="user" avatar={<ChatAvatar>QW</ChatAvatar>} timestamp="21:04">
        Можно ли использовать useSyncExternalStore для hash-роутинга?
      </ChatMessage>
      <ChatMessage
        role="assistant"
        name="QWE Assistant"
        timestamp="21:04"
        actions={<ChatMessageActions content={answer} onRegenerate={() => {}} />}
      >
        <Markdown>{answer}</Markdown>
      </ChatMessage>
    </div>
  )
}
