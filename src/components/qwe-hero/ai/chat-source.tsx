import type { ComponentProps, ReactNode } from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatSourceData {
  title: string
  url: string
  snippet?: string
  /** Favicon URL. Falls back to the domain's first letter. */
  favicon?: string
  siteName?: string
}

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function SourceIcon({ source, className }: { source: ChatSourceData; className?: string }) {
  const host = hostname(source.url)
  return (
    <span
      className={cn(
        'flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted text-[9px] font-semibold text-muted-foreground uppercase',
        className,
      )}
    >
      {source.favicon ? <img src={source.favicon} alt="" className="size-full object-cover" /> : host[0]}
    </span>
  )
}

export interface ChatSourceProps extends Omit<ComponentProps<'a'>, 'href'> {
  source: ChatSourceData
  /** Citation number shown in the corner. */
  index?: number
}

/** Card linking to a cited source. */
export function ChatSource({ source, index, className, ...props }: ChatSourceProps) {
  const host = hostname(source.url)

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex w-56 shrink-0 flex-col gap-2 rounded-xl border bg-card p-3 text-left transition-[border-color,background-color,transform] duration-150 ease-out hover:border-foreground/20 hover:bg-muted/40 active:scale-[0.98]',
        className,
      )}
      {...props}
    >
      <span className="line-clamp-2 text-sm leading-snug font-medium">{source.title}</span>
      <span className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
        <SourceIcon source={source} />
        <span className="truncate">{source.siteName ?? host}</span>
        {index !== undefined && <span className="ml-auto font-mono tabular-nums">{index}</span>}
      </span>
    </a>
  )
}

export interface ChatSourceListProps extends ComponentProps<'div'> {
  sources: ChatSourceData[]
}

/** Horizontally scrollable row of source cards. */
export function ChatSourceList({ sources, className, ...props }: ChatSourceListProps) {
  return (
    <div
      className={cn('-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] [&>*]:snap-start', className)}
      {...props}
    >
      {sources.map((s, i) => (
        <ChatSource key={s.url} source={s} index={i + 1} />
      ))}
    </div>
  )
}

export interface ChatSourceInlineProps {
  source: ChatSourceData
  index: number
  children?: ReactNode
}

/** Inline citation pill `[n]` with a hover preview. */
export function ChatSourceInline({ source, index, children }: ChatSourceInlineProps) {
  const host = hostname(source.url)

  return (
    <HoverCard.Root openDelay={150} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Источник ${index}: ${source.title}`}
          className="mx-0.5 inline-flex h-[18px] min-w-[18px] -translate-y-px items-center justify-center gap-1 rounded-full bg-muted px-1.5 align-middle font-mono text-[10px] font-medium text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {children ?? index}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          sideOffset={6}
          className="qh-pop z-50 w-72 rounded-xl border bg-popover p-3 text-popover-foreground shadow-lg"
        >
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <SourceIcon source={source} />
            <span className="truncate">{source.siteName ?? host}</span>
            <ExternalLink className="ml-auto size-3" />
          </div>
          <p className="mt-2 text-sm leading-snug font-medium">{source.title}</p>
          {source.snippet && <p className="mt-1 line-clamp-3 text-xs leading-5 text-muted-foreground">{source.snippet}</p>}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
