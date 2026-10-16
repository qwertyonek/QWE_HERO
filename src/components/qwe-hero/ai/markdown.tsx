import { Children, isValidElement, memo, useMemo, type ComponentProps, type ReactNode } from 'react'
import ReactMarkdown, { type Components, type ExtraProps } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'
import { ChatSourceInline, type ChatSourceData } from './chat-source'
import { CodeBlock } from './code-block'

function textContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textContent).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textContent(node.props.children)
  return ''
}

function MarkdownLink({ node: _, ...p }: ComponentProps<'a'> & ExtraProps) {
  return (
    <a
      className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      target="_blank"
      rel="noopener noreferrer"
      {...p}
    />
  )
}

const components: Components = {
  h1: ({ node: _, ...p }) => <h1 className="mt-6 mb-3 text-2xl font-semibold tracking-tight first:mt-0" {...p} />,
  h2: ({ node: _, ...p }) => <h2 className="mt-6 mb-3 text-xl font-semibold tracking-tight first:mt-0" {...p} />,
  h3: ({ node: _, ...p }) => <h3 className="mt-5 mb-2 text-lg font-semibold first:mt-0" {...p} />,
  h4: ({ node: _, ...p }) => <h4 className="mt-4 mb-2 font-semibold first:mt-0" {...p} />,
  p: ({ node: _, ...p }) => <p className="my-3 leading-7 first:mt-0 last:mb-0" {...p} />,
  a: MarkdownLink,
  ul: ({ node: _, ...p }) => <ul className="my-3 list-disc space-y-1 pl-6 marker:text-muted-foreground" {...p} />,
  ol: ({ node: _, ...p }) => <ol className="my-3 list-decimal space-y-1 pl-6 marker:text-muted-foreground" {...p} />,
  li: ({ node: _, className, ...p }) => (
    <li className={cn('leading-7', className?.includes('task-list-item') && 'list-none [&>input]:mr-2 -ml-6')} {...p} />
  ),
  blockquote: ({ node: _, ...p }) => (
    <blockquote className="my-4 border-l-2 border-accent/50 pl-4 text-muted-foreground" {...p} />
  ),
  hr: () => <hr className="my-6" />,
  table: ({ node: _, ...p }) => (
    <div className="my-4 overflow-x-auto rounded-lg border">
      <table className="w-full text-sm" {...p} />
    </div>
  ),
  thead: ({ node: _, ...p }) => <thead className="bg-muted/50" {...p} />,
  th: ({ node: _, ...p }) => <th className="border-b px-3 py-2 text-left font-medium" {...p} />,
  td: ({ node: _, ...p }) => <td className="border-b px-3 py-2 [tr:last-child_&]:border-0" {...p} />,
  img: ({ node: _, alt, ...p }) => <img alt={alt ?? ''} loading="lazy" className="my-4 rounded-lg border" {...p} />,
  // Fenced blocks: <pre><code class="language-x">…</code></pre> → CodeBlock.
  pre: ({ children }) => {
    const child = Children.toArray(children)[0]
    const props = isValidElement<{ className?: string; children?: ReactNode }>(child) ? child.props : {}
    const language = /language-([\w-]+)/.exec(props.className ?? '')?.[1]
    return <CodeBlock className="my-4" code={textContent(props.children)} language={language} />
  },
  code: ({ node: _, className, ...p }) => (
    <code className={cn('rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em]', className)} {...p} />
  ),
}

export interface MarkdownProps {
  /** Markdown source. Raw HTML is escaped, unsafe URLs are dropped. */
  children: string
  /** Enables citations: `[1](#cite-1)` renders as a ChatSourceInline for sources[0]. */
  sources?: ChatSourceData[]
  className?: string
}

const remarkPlugins = [remarkGfm]

export const Markdown = memo(function Markdown({ children, sources, className }: MarkdownProps) {
  const mapped = useMemo<Components>(() => {
    if (!sources?.length) return components
    return {
      ...components,
      a: (props) => {
        const index = Number(/^#cite-(\d+)$/.exec(props.href ?? '')?.[1])
        const source = sources[index - 1]
        return source ? <ChatSourceInline source={source} index={index} /> : <MarkdownLink {...props} />
      },
    }
  }, [sources])

  return (
    <div className={cn('text-sm break-words text-foreground', className)}>
      <ReactMarkdown remarkPlugins={remarkPlugins} components={mapped}>
        {children}
      </ReactMarkdown>
    </div>
  )
})
