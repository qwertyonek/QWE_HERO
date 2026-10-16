import { useId, useState, type ReactNode } from 'react'
import { Brain, ChevronDown } from 'lucide-react'
import { Collapse } from '@/components/ui/collapse'
import { cn } from '@/lib/utils'
import { TextShimmer } from './text-shimmer'

export interface ThoughtStep {
  id: string
  title: ReactNode
  content?: ReactNode
  status?: 'complete' | 'active' | 'pending'
  /** Optional icon replacing the timeline dot. */
  icon?: ReactNode
}

export interface ChainOfThoughtProps {
  steps: ThoughtStep[]
  /** While true the header shimmers and the panel stays open (uncontrolled). */
  isStreaming?: boolean
  /** Thinking time in seconds, shown once streaming ends. */
  duration?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function ChainOfThought({
  steps,
  isStreaming = false,
  duration,
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
}: ChainOfThoughtProps) {
  const panelId = useId()
  const [innerOpen, setInnerOpen] = useState(defaultOpen ?? isStreaming)
  const [prevStreaming, setPrevStreaming] = useState(isStreaming)

  // Uncontrolled: open while thinking, fold away once the answer starts.
  if (prevStreaming !== isStreaming) {
    setPrevStreaming(isStreaming)
    setInnerOpen(isStreaming)
  }

  const open = openProp ?? innerOpen
  const setOpen = (next: boolean) => {
    setInnerOpen(next)
    onOpenChange?.(next)
  }

  const label = isStreaming
    ? 'Размышляю…'
    : duration !== undefined
      ? `Размышления · ${duration < 60 ? `${Math.round(duration)} с` : `${Math.floor(duration / 60)} мин ${Math.round(duration % 60)} с`}`
      : 'Размышления'

  return (
    <div className={cn('w-full text-sm', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="group inline-flex items-center gap-2 rounded-md py-1 text-muted-foreground transition-[color,transform] duration-150 ease-out hover:text-foreground active:scale-[0.98]"
      >
        <Brain className="size-4" />
        {isStreaming ? <TextShimmer className="font-medium">{label}</TextShimmer> : <span className="font-medium">{label}</span>}
        <ChevronDown className={cn('size-3.5 transition-transform duration-200 ease-out', open && 'rotate-180')} />
      </button>

      <Collapse open={open} id={panelId}>
        <ol className="relative mt-2 ml-[7px] space-y-4 border-l pb-1 pl-5">
          {steps.map((step) => {
            const status = step.status ?? 'complete'
            return (
              <li key={step.id} className={cn('relative', status === 'pending' && 'opacity-50')}>
                <span className="absolute top-1.5 -left-[25px] flex size-[9px] items-center justify-center" aria-hidden>
                  {step.icon ? (
                    <span className="flex size-4 items-center justify-center rounded-full bg-background text-muted-foreground [&_svg]:size-3">
                      {step.icon}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        'size-[9px] rounded-full border-2 border-background',
                        status === 'active' ? 'bg-accent' : 'bg-muted-foreground/50',
                      )}
                    />
                  )}
                  {status === 'active' && !step.icon && <span className="absolute size-[9px] animate-ping rounded-full bg-accent/60" />}
                </span>
                <div className="font-medium">
                  {status === 'active' ? <TextShimmer>{step.title}</TextShimmer> : step.title}
                </div>
                {step.content && <div className="mt-1 leading-6 text-muted-foreground">{step.content}</div>}
              </li>
            )
          })}
        </ol>
      </Collapse>
    </div>
  )
}
