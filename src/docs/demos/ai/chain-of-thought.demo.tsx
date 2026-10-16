import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { ChainOfThought, type ThoughtStep } from '@/components/qwe-hero/ai'
import { Button } from '@/components/ui/button'

const script: Omit<ThoughtStep, 'status'>[] = [
  { id: '1', title: 'Разбираю вопрос', content: 'Пользователь сравнивает SSE и WebSocket для стриминга ответов LLM.' },
  { id: '2', title: 'Ищу в документации', icon: <Search />, content: 'MDN: EventSource, автопереподключение, только текст.' },
  { id: '3', title: 'Сравниваю ограничения', content: 'SSE работает поверх HTTP/2 и проходит через прокси без апгрейда.' },
  { id: '4', title: 'Формулирую ответ' },
]

export default function ChainOfThoughtDemo() {
  const [active, setActive] = useState(script.length)
  const [elapsed, setElapsed] = useState(7)
  const timer = useRef<ReturnType<typeof setInterval>>(undefined)
  const streaming = active < script.length

  useEffect(() => () => clearInterval(timer.current), [])

  const run = () => {
    clearInterval(timer.current)
    const started = Date.now()
    setActive(0)
    timer.current = setInterval(() => {
      setActive((a) => {
        if (a + 1 >= script.length) {
          clearInterval(timer.current)
          setElapsed((Date.now() - started) / 1000)
        }
        return a + 1
      })
    }, 1100)
  }

  const steps: ThoughtStep[] = script.map((s, i) => ({
    ...s,
    status: i < active ? 'complete' : i === active ? 'active' : 'pending',
  }))

  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-4">
      <ChainOfThought steps={steps} isStreaming={streaming} duration={elapsed} defaultOpen />
      <Button variant="outline" size="sm" onClick={run} disabled={streaming}>
        {streaming ? 'Думает…' : 'Запустить заново'}
      </Button>
    </div>
  )
}
