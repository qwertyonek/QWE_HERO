import { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'
import { ChatTool, type ChatToolStatus } from '@/components/qwe-hero/ai'
import { Button } from '@/components/ui/button'

export default function ChatToolDemo() {
  const [status, setStatus] = useState<ChatToolStatus>('success')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const run = () => {
    setStatus('running')
    timer.current = setTimeout(() => setStatus('success'), 1800)
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <ChatTool
        name="search_web"
        icon={<Globe />}
        description="Поиск: «server-sent events vs websocket»"
        status={status}
        durationMs={1240}
        args={{ query: 'server-sent events vs websocket', limit: 3 }}
        result={status === 'success' ? { results: [{ title: 'Using server-sent events', url: 'https://developer.mozilla.org' }] } : undefined}
        defaultOpen
      />
      <ChatTool name="get_weather" status="error" args={{ city: 'Moscow' }} error="503 Service Unavailable: upstream timeout" durationMs={5012} />
      <ChatTool name="send_email" status="pending" description="Ожидает подтверждения пользователя" />
      <Button variant="outline" size="sm" className="self-start" onClick={run} disabled={status === 'running'}>
        Выполнить search_web
      </Button>
    </div>
  )
}
