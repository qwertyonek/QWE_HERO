import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { ChatMessageActions, type ChatFeedback } from '@/components/qwe-hero/ai'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export default function ChatMessageActionsDemo() {
  const [feedback, setFeedback] = useState<ChatFeedback>(null)
  const [regenerated, setRegenerated] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <ChatMessageActions
        content="Текст ответа модели"
        onRegenerate={() => setRegenerated((n) => n + 1)}
        feedback={feedback}
        onFeedbackChange={setFeedback}
        extra={
          <Tooltip content="Поделиться">
            <Button variant="ghost" size="icon-sm" aria-label="Поделиться" className="[&_svg]:size-3.5">
              <Share2 />
            </Button>
          </Tooltip>
        }
      />
      <p className="font-mono text-xs text-muted-foreground">
        feedback: {String(feedback)} · regenerated: {regenerated}
      </p>
    </div>
  )
}
