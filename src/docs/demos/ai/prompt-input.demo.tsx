import { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'
import { PromptInput, type ChatAttachmentData } from '@/components/qwe-hero/ai'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function PromptInputDemo() {
  const [loading, setLoading] = useState(false)
  const [webSearch, setWebSearch] = useState(false)
  const [attachments, setAttachments] = useState<ChatAttachmentData[]>([])
  const [last, setLast] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const urls = useRef<string[]>([])
  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), [])

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <PromptInput
        isLoading={loading}
        onStop={() => {
          clearTimeout(timer.current)
          setLoading(false)
        }}
        onSubmit={(text) => {
          setLast(text)
          setAttachments([])
          setLoading(true)
          timer.current = setTimeout(() => setLoading(false), 2500)
        }}
        attachments={attachments}
        onAttach={(files) =>
          setAttachments((list) => [
            ...list,
            ...files.map((f) => {
              const previewUrl = f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined
              if (previewUrl) urls.current.push(previewUrl)
              return { id: crypto.randomUUID(), name: f.name, size: f.size, type: f.type, previewUrl }
            }),
          ])
        }
        onRemoveAttachment={(id) => setAttachments((list) => list.filter((a) => a.id !== id))}
        toolbar={
          <Button
            variant="ghost"
            size="sm"
            aria-pressed={webSearch}
            onClick={() => setWebSearch((v) => !v)}
            className={cn('rounded-full [&_svg]:size-3.5', webSearch && 'bg-accent-soft text-accent hover:bg-accent-soft hover:text-accent')}
          >
            <Globe />
            Поиск
          </Button>
        }
        footer="Enter — отправить, Shift+Enter — новая строка. Файлы можно перетащить или вставить."
      />
      <p className="text-center font-mono text-xs text-muted-foreground">
        {loading ? 'генерация… нажмите стоп' : `отправлено: ${last ?? '—'}`}
      </p>
    </div>
  )
}
