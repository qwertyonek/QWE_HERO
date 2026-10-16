import { useEffect, useState } from 'react'
import { ChatAttachmentList, type ChatAttachmentData } from '@/components/qwe-hero/ai'
import { Button } from '@/components/ui/button'

const gradient = (a: string, b: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="112" height="112" fill="url(#g)"/></svg>`,
  )}`

const initial: ChatAttachmentData[] = [
  { id: '1', name: 'screenshot.png', type: 'image/png', previewUrl: gradient('#60a5fa', '#1e3a8a') },
  { id: '2', name: 'report-q3.pdf', type: 'application/pdf', size: 2_480_000 },
  { id: '3', name: 'chat-message.tsx', type: 'text/typescript', size: 4_210 },
  { id: '4', name: 'dataset.zip', type: 'application/zip', size: 18_400_000, progress: 0 },
  { id: '5', name: 'broken.csv', type: 'text/csv', error: 'Файл слишком большой' },
]

export default function ChatAttachmentDemo() {
  const [items, setItems] = useState(initial)

  // Fake upload progress for the zip file.
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((list) =>
        list.map((a) => (a.progress !== undefined && a.progress < 100 ? { ...a, progress: Math.min(100, a.progress + 7) } : a)),
      )
    }, 250)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-4">
      <ChatAttachmentList attachments={items} onRemove={(id) => setItems((l) => l.filter((a) => a.id !== id))} className="justify-center" />
      <Button variant="outline" size="sm" onClick={() => setItems(initial)}>
        Сбросить
      </Button>
    </div>
  )
}
