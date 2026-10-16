import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      aria-label={copied ? 'Скопировано' : 'Копировать код'}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className={cn(
        'inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-xs font-medium text-muted-foreground transition-[color,background-color,transform] duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-[0.97]',
        className,
      )}
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      {copied ? 'Скопировано' : 'Копировать'}
    </button>
  )
}

export function CodeViewer({ code, filename }: { code: string; filename?: string }) {
  const lines = code.replace(/\n$/, '').split('\n')

  return (
    <div className="overflow-hidden rounded-lg border bg-muted/40">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">{filename ?? 'example.tsx'}</span>
        <CopyButton value={code} />
      </div>
      <pre className="max-h-[480px] overflow-auto py-3 font-mono text-[13px] leading-6">
        <code className="grid">
          {lines.map((line, i) => (
            <span key={i} className="px-4 hover:bg-muted">
              <span className="mr-4 inline-block w-6 text-right text-muted-foreground/60 select-none">
                {i + 1}
              </span>
              {line || ' '}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}
