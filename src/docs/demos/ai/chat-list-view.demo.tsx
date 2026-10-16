import { useState } from 'react'
import { ChatListView, ChatMessage } from '@/components/qwe-hero/ai'
import { Button } from '@/components/ui/button'

const lines = [
  'Привет! Покажи, как работает авто-скролл.',
  'Каждое новое сообщение прокручивает список вниз, пока вы внизу.',
  'Прокрутите вверх: появится кнопка «к последнему».',
  'А новые сообщения не будут сбивать вам позицию чтения.',
]

export default function ChatListViewDemo() {
  const [count, setCount] = useState(6)

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <ChatListView className="h-80 rounded-xl border">
        {Array.from({ length: count }, (_, i) => (
          <ChatMessage key={i} role={i % 2 ? 'assistant' : 'user'}>
            {lines[i % lines.length]}
          </ChatMessage>
        ))}
      </ChatListView>
      <Button variant="outline" size="sm" className="self-start" onClick={() => setCount((c) => c + 1)}>
        Добавить сообщение
      </Button>
    </div>
  )
}
