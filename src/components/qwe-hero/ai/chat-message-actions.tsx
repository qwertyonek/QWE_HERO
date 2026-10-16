import { useState, type ComponentProps, type ReactNode } from 'react'
import { Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

export type ChatFeedback = 'up' | 'down' | null

export interface ChatMessageActionsProps extends ComponentProps<'div'> {
  /** Text placed on the clipboard by the copy action. Omit to hide copy. */
  content?: string
  onRegenerate?: () => void
  /** Controlled feedback. Leave undefined for uncontrolled. */
  feedback?: ChatFeedback
  onFeedbackChange?: (feedback: ChatFeedback) => void
  /** Hide the thumbs buttons. */
  hideFeedback?: boolean
  /** Extra actions appended after the built-in ones. */
  extra?: ReactNode
}

function ActionButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <Tooltip content={label}>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        aria-pressed={active}
        onClick={onClick}
        className={cn('[&_svg]:size-3.5', active && 'text-foreground')}
      >
        {children}
      </Button>
    </Tooltip>
  )
}

export function ChatMessageActions({
  content,
  onRegenerate,
  feedback: feedbackProp,
  onFeedbackChange,
  hideFeedback,
  extra,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { copied, copy } = useCopyToClipboard()
  const [innerFeedback, setInnerFeedback] = useState<ChatFeedback>(null)
  const feedback = feedbackProp === undefined ? innerFeedback : feedbackProp

  const toggle = (value: Exclude<ChatFeedback, null>) => {
    const next = feedback === value ? null : value
    setInnerFeedback(next)
    onFeedbackChange?.(next)
  }

  return (
    <div role="toolbar" aria-label="Действия с сообщением" className={cn('flex items-center gap-0.5', className)} {...props}>
      {content !== undefined && (
        <ActionButton label={copied ? 'Скопировано' : 'Копировать'} onClick={() => copy(content)}>
          {copied ? <Check className="text-success" /> : <Copy />}
        </ActionButton>
      )}
      {onRegenerate && (
        <ActionButton label="Сгенерировать заново" onClick={onRegenerate}>
          <RefreshCw />
        </ActionButton>
      )}
      {!hideFeedback && (
        <>
          <ActionButton label="Хороший ответ" active={feedback === 'up'} onClick={() => toggle('up')}>
            <motion.span key={`up-${feedback === 'up'}`} initial={{ scale: feedback === 'up' ? 0.6 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.4, bounce: 0.5 }}>
              <ThumbsUp className={cn(feedback === 'up' && 'fill-current')} />
            </motion.span>
          </ActionButton>
          <ActionButton label="Плохой ответ" active={feedback === 'down'} onClick={() => toggle('down')}>
            <motion.span key={`down-${feedback === 'down'}`} initial={{ scale: feedback === 'down' ? 0.6 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.4, bounce: 0.5 }}>
              <ThumbsDown className={cn(feedback === 'down' && 'fill-current')} />
            </motion.span>
          </ActionButton>
        </>
      )}
      {extra}
    </div>
  )
}
