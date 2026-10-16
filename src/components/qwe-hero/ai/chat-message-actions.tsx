import { useState, type ComponentProps, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Ellipsis, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

function Root({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="chat-message-actions" role="toolbar" className={cn('chat-message-actions', className)} {...props} />
}

interface ActionProps extends Omit<ButtonProps, 'children'> {
  /** Accessible name; also shown as the tooltip. */
  'aria-label': string
  /** Tooltip text, defaults to aria-label. Pass `null` to disable. */
  tooltip?: ReactNode | null
  children: ReactNode
}

/** Ghost icon button in the message action row. */
function Action({ tooltip, className, children, ...props }: ActionProps) {
  const button = (
    <Button
      data-slot="chat-message-action"
      variant="ghost"
      size="sm"
      isIconOnly
      className={cn('chat-message__action chat-message-actions__action', className)}
      {...props}
    >
      {children}
    </Button>
  )
  if (tooltip === null) return button
  return <Tooltip content={tooltip ?? props['aria-label']}>{button}</Tooltip>
}

const swap = {
  initial: { opacity: 0, scale: 0.5, filter: 'blur(2px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.5, filter: 'blur(2px)' },
  transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] as const },
}

type PresetProps = Omit<ActionProps, 'aria-label' | 'children'> & { 'aria-label'?: string; icon?: ReactNode }

interface CopyProps extends PresetProps {
  /** Text written to the clipboard. */
  value: string
  copiedIcon?: ReactNode
  onCopy?: () => void
}

function CopyAction({ value, icon, copiedIcon, onCopy, onClick, ...props }: CopyProps) {
  const { copied, copy } = useCopyToClipboard()
  return (
    <Action
      aria-label={copied ? 'Copied' : 'Copy'}
      onClick={(e) => {
        onClick?.(e)
        void copy(value).then((ok) => ok && onCopy?.())
      }}
      {...props}
    >
      <span data-slot="chat-message-actions-copy-icon-motion" className="flex size-4 items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={copied ? 'check' : 'copy'} {...swap} className="flex">
            {copied
              ? (copiedIcon ?? <Check data-slot="chat-message-actions-copied-icon" className="size-4" />)
              : (icon ?? <Copy data-slot="chat-message-actions-copy-icon" className="size-4" />)}
          </motion.span>
        </AnimatePresence>
      </span>
    </Action>
  )
}

interface ToggleProps extends PresetProps {
  isSelected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
}

function useToggle({ isSelected, defaultSelected = false, onSelectedChange }: ToggleProps) {
  const [inner, setInner] = useState(defaultSelected)
  const selected = isSelected ?? inner
  return [
    selected,
    () => {
      setInner(!selected)
      onSelectedChange?.(!selected)
    },
  ] as const
}

function ThumbsUpAction({ icon, isSelected, defaultSelected, onSelectedChange, onClick, ...props }: ToggleProps) {
  const [selected, toggle] = useToggle({ isSelected, defaultSelected, onSelectedChange })
  return (
    <Action aria-label="Good response" aria-pressed={selected} onClick={(e) => (onClick?.(e), toggle())} {...props}>
      {icon ?? <ThumbsUp data-slot="chat-message-actions-thumbs-up-icon" className={cn('size-4', selected && 'fill-current')} />}
    </Action>
  )
}

function ThumbsDownAction({ icon, isSelected, defaultSelected, onSelectedChange, onClick, ...props }: ToggleProps) {
  const [selected, toggle] = useToggle({ isSelected, defaultSelected, onSelectedChange })
  return (
    <Action aria-label="Bad response" aria-pressed={selected} onClick={(e) => (onClick?.(e), toggle())} {...props}>
      {icon ?? <ThumbsDown data-slot="chat-message-actions-thumbs-down-icon" className={cn('size-4', selected && 'fill-current')} />}
    </Action>
  )
}

function RegenerateAction({ icon, ...props }: PresetProps) {
  return (
    <Action aria-label="Regenerate" {...props}>
      {icon ?? <RefreshCw data-slot="chat-message-actions-regenerate-icon" className="size-4" />}
    </Action>
  )
}

function MoreAction({ icon, ...props }: PresetProps) {
  return (
    <Action aria-label="More actions" {...props}>
      {icon ?? <Ellipsis data-slot="chat-message-actions-menu-icon" className="size-4" />}
    </Action>
  )
}

export const ChatMessageActions = Object.assign(Root, {
  Action,
  Copy: CopyAction,
  ThumbsUp: ThumbsUpAction,
  ThumbsDown: ThumbsDownAction,
  Regenerate: RegenerateAction,
  More: MoreAction,
})
