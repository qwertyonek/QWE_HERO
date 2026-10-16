import { Fragment, useEffect, useState, type ComponentProps } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { highlight } from '@/lib/highlighter'
import { cn } from '@/lib/utils'

export interface CodeBlockProps extends Omit<ComponentProps<'div'>, 'children'> {
  code: string
  language?: string
  /** Shown in the header instead of the language label. */
  filename?: string
  showLineNumbers?: boolean
  /** Hide the header bar (copy button stays available on hover). */
  hideHeader?: boolean
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  hideHeader = false,
  className,
  ...props
}: CodeBlockProps) {
  const source = code.replace(/\n$/, '')
  const [highlighted, setHighlighted] = useState<{ source: string; html: string } | null>(null)
  const { copied, copy } = useCopyToClipboard()

  useEffect(() => {
    let cancelled = false
    highlight(source, language).then((html) => {
      if (!cancelled && html) setHighlighted({ source, html })
    })
    return () => {
      cancelled = true
    }
  }, [source, language])

  const copyButton = (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? 'Скопировано' : 'Копировать код'}
      onClick={() => copy(source)}
      className="[&_svg]:size-3.5"
    >
      {copied ? <Check className="text-success" /> : <Copy />}
    </Button>
  )

  return (
    <div className={cn('group/code relative overflow-hidden rounded-lg border bg-muted/40 text-left', className)} {...props}>
      {hideHeader ? (
        <div className="absolute top-1.5 right-1.5 z-10 opacity-0 transition-opacity duration-150 group-hover/code:opacity-100 focus-within:opacity-100">
          {copyButton}
        </div>
      ) : (
        <div className="flex h-9 items-center justify-between border-b pr-1 pl-3">
          <span className="truncate font-mono text-xs text-muted-foreground">{filename ?? language ?? 'text'}</span>
          {copyButton}
        </div>
      )}
      <div
        className={cn(
          'overflow-x-auto py-3 font-mono text-[13px] leading-6',
          '[&_pre]:min-w-max [&_pre]:[counter-reset:line] [&_.line]:inline-block [&_.line]:w-full [&_.line]:px-4',
          '[&_span]:text-(--shiki-light) dark:[&_span]:text-(--shiki-dark) [&_.shiki]:bg-transparent!',
          showLineNumbers &&
            '[&_.line]:[counter-increment:line] [&_.line]:before:mr-4 [&_.line]:before:inline-block [&_.line]:before:w-6 [&_.line]:before:text-right [&_.line]:before:text-muted-foreground/60 [&_.line]:before:content-[counter(line)] [&_.line]:before:select-none',
        )}
      >
        {highlighted?.source === source ? (
          <div dangerouslySetInnerHTML={{ __html: highlighted.html }} />
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
