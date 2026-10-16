import { useCallback, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatListViewProps extends ComponentProps<'div'> {
  children?: ReactNode
  /** Follow new content while the user is at the bottom. */
  autoScroll?: boolean
  /** Distance in px from the bottom that still counts as "at bottom". */
  threshold?: number
  /** Rendered centered when there are no children. */
  emptyState?: ReactNode
  contentClassName?: string
}

export function ChatListView({
  children,
  autoScroll = true,
  threshold = 80,
  emptyState,
  className,
  contentClassName,
  ...props
}: ChatListViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const stickRef = useRef(true)
  const [atBottom, setAtBottom] = useState(true)
  const isEmpty = !children || (Array.isArray(children) && children.length === 0)

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current
    if (!el) return
    stickRef.current = true
    el.scrollTo({ top: el.scrollHeight, behavior })
  }, [])

  // Content growth (new messages, streamed tokens, expanding panels) keeps us pinned.
  useEffect(() => {
    const content = contentRef.current
    if (!content || !autoScroll) return
    const observer = new ResizeObserver(() => {
      if (stickRef.current) scrollToBottom('instant')
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [autoScroll, scrollToBottom])

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
    stickRef.current = bottom
    setAtBottom(bottom)
  }

  return (
    <div className={cn('relative min-h-0', className)} {...props}>
      <div ref={scrollRef} onScroll={onScroll} className="h-full overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
        {isEmpty && emptyState ? (
          <div className="flex h-full items-center justify-center p-6">{emptyState}</div>
        ) : (
          <div ref={contentRef} role="log" aria-live="polite" className={cn('flex flex-col gap-6 p-4', contentClassName)}>
            {children}
          </div>
        )}
      </div>

      <AnimatePresence>
        {!atBottom && !isEmpty && (
          <motion.button
            type="button"
            aria-label="К последнему сообщению"
            onClick={() => scrollToBottom()}
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-3 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border bg-card text-muted-foreground shadow-md hover:text-foreground"
          >
            <ArrowDown className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
