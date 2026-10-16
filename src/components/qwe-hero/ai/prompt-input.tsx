import { useLayoutEffect, useRef, useState, type ClipboardEvent, type DragEvent, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, Paperclip, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ChatAttachmentList, type ChatAttachmentData } from './chat-attachment'

export interface PromptInputProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called on Enter / send click with the trimmed text. Clears uncontrolled input. */
  onSubmit?: (value: string) => void
  /** Shows the stop button instead of send. */
  isLoading?: boolean
  onStop?: () => void
  placeholder?: string
  disabled?: boolean
  /** Rows before the textarea starts scrolling. */
  maxRows?: number
  attachments?: ChatAttachmentData[]
  /** Enables the paperclip button, drag & drop and image paste. */
  onAttach?: (files: File[]) => void
  onRemoveAttachment?: (id: string) => void
  accept?: string
  /** Extra controls on the left of the bottom bar (model picker, tools…). */
  toolbar?: ReactNode
  /** Hint under the input. */
  footer?: ReactNode
  /** Allow submitting with only attachments. */
  allowEmptySubmit?: boolean
  className?: string
}

const LINE_HEIGHT = 24

export function PromptInput({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  onSubmit,
  isLoading = false,
  onStop,
  placeholder = 'Спросите что-нибудь…',
  disabled,
  maxRows = 8,
  attachments = [],
  onAttach,
  onRemoveAttachment,
  accept,
  toolbar,
  footer,
  allowEmptySubmit,
  className,
}: PromptInputProps) {
  const [inner, setInner] = useState(defaultValue)
  const value = valueProp ?? inner
  const [dragging, setDragging] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const setValue = (next: string) => {
    if (valueProp === undefined) setInner(next)
    onValueChange?.(next)
  }

  // Auto-grow up to maxRows.
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, LINE_HEIGHT * maxRows)}px`
  }, [value, maxRows])

  const canSubmit = !disabled && !isLoading && (value.trim().length > 0 || (allowEmptySubmit && attachments.length > 0))

  const submit = () => {
    if (!canSubmit) return
    onSubmit?.(value.trim())
    if (valueProp === undefined) setInner('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  const onPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    if (!onAttach) return
    const files = Array.from(e.clipboardData.files)
    if (files.length) {
      e.preventDefault()
      onAttach(files)
    }
  }

  const dragProps = onAttach
    ? {
        onDragOver: (e: DragEvent) => {
          if (!e.dataTransfer.types.includes('Files')) return
          e.preventDefault()
          setDragging(true)
        },
        onDragLeave: (e: DragEvent) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
        },
        onDrop: (e: DragEvent) => {
          e.preventDefault()
          setDragging(false)
          const files = Array.from(e.dataTransfer.files)
          if (files.length) onAttach(files)
        },
      }
    : {}

  return (
    <div className={cn('w-full', className)}>
      <div
        {...dragProps}
        onClick={(e) => {
          if (e.target === e.currentTarget) textareaRef.current?.focus()
        }}
        className={cn(
          'relative flex flex-col gap-2 rounded-2xl border bg-card p-2 shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:border-foreground/25 focus-within:ring-4 focus-within:ring-ring/15',
          dragging && 'border-accent ring-4 ring-ring/20',
          disabled && 'opacity-60',
        )}
      >
        {attachments.length > 0 && (
          <ChatAttachmentList attachments={attachments} onRemove={onRemoveAttachment} className="px-1 pt-1" />
        )}

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          className="w-full resize-none bg-transparent px-2 py-1 text-sm leading-6 outline-none placeholder:text-muted-foreground"
        />

        <div className="flex items-center gap-1">
          {onAttach && (
            <>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept={accept}
                hidden
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? [])
                  if (files.length) onAttach(files)
                  e.target.value = ''
                }}
              />
              <Tooltip content="Прикрепить файл">
                <Button variant="ghost" size="icon-sm" aria-label="Прикрепить файл" disabled={disabled} onClick={() => fileRef.current?.click()}>
                  <Paperclip />
                </Button>
              </Tooltip>
            </>
          )}
          {toolbar}

          <div className="ml-auto">
            <AnimatePresence mode="popLayout" initial={false}>
              {isLoading ? (
                <motion.span key="stop" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }} className="block">
                  <Button size="icon-sm" aria-label="Остановить генерацию" onClick={onStop} className="rounded-full [&_svg]:size-3">
                    <Square className="fill-current" />
                  </Button>
                </motion.span>
              ) : (
                <motion.span key="send" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }} className="block">
                  <Button size="icon-sm" aria-label="Отправить" disabled={!canSubmit} onClick={submit} className="rounded-full">
                    <ArrowUp />
                  </Button>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {dragging && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-accent-soft/80 text-sm font-medium text-accent">
            Отпустите, чтобы прикрепить
          </div>
        )}
      </div>
      {footer && <div className="mt-2 px-2 text-center text-xs text-muted-foreground">{footer}</div>}
    </div>
  )
}
