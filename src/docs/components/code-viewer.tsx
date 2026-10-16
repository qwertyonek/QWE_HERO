import { Fragment, useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { highlight } from '@/lib/highlighter'
import { cn } from '@/lib/utils'

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      aria-label={copied ? 'Скопировано' : 'Копировать код'}
      onClick={() => copy(value)}
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

function langFromFilename(filename?: string) {
  if (!filename) return 'tsx'
  if (filename === 'terminal') return 'bash'
  return filename.split('.').pop()
}

export function CodeViewer({ code, filename, lang }: { code: string; filename?: string; lang?: string }) {
  const source = code.replace(/\n$/, '')
  const [html, setHtml] = useState<{ source: string; html: string } | null>(null)

  useEffect(() => {
    let cancelled = false
    highlight(source, lang ?? langFromFilename(filename)).then((result) => {
      if (!cancelled && result) setHtml({ source, html: result })
    })
    return () => {
      cancelled = true
    }
  }, [source, lang, filename])

  return (
    <div className="overflow-hidden rounded-lg border bg-muted/40">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="truncate font-mono text-xs text-muted-foreground">{filename ?? 'example.tsx'}</span>
        <CopyButton value={code} />
      </div>
      <div className="qh-code max-h-[480px] overflow-auto py-3 font-mono text-[13px] leading-6">
        {html?.source === source ? (
          <div dangerouslySetInnerHTML={{ __html: html.html }} />
        ) : (
          <pre>
            <code>
              {source.split('\n').map((line, i) => (
                <Fragment key={i}>
                  <span className="line">{line}</span>
                  {'\n'}
                </Fragment>
              ))}
            </code>
          </pre>
        )}
      </div>
    </div>
  )
}
