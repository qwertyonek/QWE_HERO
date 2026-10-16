import { useId, useState, type ReactNode } from 'react'
import { ChevronDown, CircleCheck, CircleDashed, CircleX, LoaderCircle, Wrench } from 'lucide-react'
import { Collapse } from '@/components/ui/collapse'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'
import { TextShimmer } from './text-shimmer'

export type ChatToolStatus = 'pending' | 'running' | 'success' | 'error'

export interface ChatToolProps {
  /** Tool / function name, e.g. `search_web`. */
  name: string
  status: ChatToolStatus
  description?: ReactNode
  args?: unknown
  result?: unknown
  error?: string
  /** Execution time in milliseconds. */
  durationMs?: number
  icon?: ReactNode
  defaultOpen?: boolean
  className?: string
}

const statusMeta: Record<ChatToolStatus, { label: string; className: string; icon: ReactNode }> = {
  pending: { label: 'Ожидает', className: 'text-muted-foreground', icon: <CircleDashed /> },
  running: { label: 'Выполняется', className: 'text-accent', icon: <LoaderCircle className="animate-spin" /> },
  success: { label: 'Готово', className: 'text-success', icon: <CircleCheck /> },
  error: { label: 'Ошибка', className: 'text-danger', icon: <CircleX /> },
}

const toCode = (value: unknown) => (typeof value === 'string' ? value : JSON.stringify(value, null, 2))

export function ChatTool({
  name,
  status,
  description,
  args,
  result,
  error,
  durationMs,
  icon,
  defaultOpen = false,
  className,
}: ChatToolProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const meta = statusMeta[status]
  const hasBody = args !== undefined || result !== undefined || error

  return (
    <div className={cn('w-full overflow-hidden rounded-xl border bg-card text-sm', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        disabled={!hasBody}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 hover:bg-muted/50 disabled:cursor-default disabled:hover:bg-transparent"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-3.5">
          {icon ?? <Wrench />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[13px] font-medium">
            {status === 'running' ? <TextShimmer>{name}</TextShimmer> : name}
          </span>
          {description && <span className="block truncate text-xs text-muted-foreground">{description}</span>}
        </span>
        {durationMs !== undefined && status !== 'running' && (
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {durationMs < 1000 ? `${durationMs} ms` : `${(durationMs / 1000).toFixed(1)} s`}
          </span>
        )}
        <span className={cn('flex items-center gap-1 text-xs font-medium [&_svg]:size-3.5', meta.className)}>
          {meta.icon}
          <span className="hidden sm:inline">{meta.label}</span>
        </span>
        {hasBody && (
          <ChevronDown className={cn('size-3.5 text-muted-foreground transition-transform duration-200 ease-out', open && 'rotate-180')} />
        )}
      </button>

      <Collapse open={open && Boolean(hasBody)} id={panelId}>
        <div className="space-y-3 border-t p-3">
          {args !== undefined && (
            <section className="space-y-1.5">
              <h4 className="text-xs font-medium text-muted-foreground">Аргументы</h4>
              <CodeBlock code={toCode(args)} language="json" hideHeader />
            </section>
          )}
          {error ? (
            <section className="space-y-1.5">
              <h4 className="text-xs font-medium text-danger">Ошибка</h4>
              <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 font-mono text-xs text-danger">{error}</p>
            </section>
          ) : (
            result !== undefined && (
              <section className="space-y-1.5">
                <h4 className="text-xs font-medium text-muted-foreground">Результат</h4>
                <CodeBlock code={toCode(result)} language="json" hideHeader />
              </section>
            )
          )}
        </div>
      </Collapse>
    </div>
  )
}
