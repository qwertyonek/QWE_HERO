import { useState } from 'react'
import { Code2, Languages, Lightbulb, PenLine } from 'lucide-react'
import { PromptSuggestion, PromptSuggestionGroup } from '@/components/qwe-hero/ai'

const chips = [
  { icon: <Lightbulb />, label: 'Придумай идеи' },
  { icon: <Code2 />, label: 'Напиши код' },
  { icon: <PenLine />, label: 'Улучши текст' },
  { icon: <Languages />, label: 'Переведи' },
]

export default function PromptSuggestionDemo() {
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <PromptSuggestionGroup className="justify-center">
        {chips.map((c) => (
          <PromptSuggestion key={c.label} icon={c.icon} onClick={() => setPicked(c.label)}>
            {c.label}
          </PromptSuggestion>
        ))}
      </PromptSuggestionGroup>
      <div className="grid gap-2 sm:grid-cols-2">
        <PromptSuggestion variant="card" icon={<Code2 />} description="Разбить компонент на хуки" onClick={() => setPicked('Рефакторинг')}>
          Рефакторинг React
        </PromptSuggestion>
        <PromptSuggestion variant="card" icon={<Lightbulb />} description="SSE против WebSocket" onClick={() => setPicked('Объяснение')}>
          Объясни разницу
        </PromptSuggestion>
      </div>
      <p className="text-center font-mono text-xs text-muted-foreground">выбрано: {picked ?? '—'}</p>
    </div>
  )
}
