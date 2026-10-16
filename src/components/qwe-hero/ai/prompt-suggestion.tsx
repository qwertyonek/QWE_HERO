import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface PromptSuggestionProps extends Omit<ComponentProps<'button'>, 'title'> {
  icon?: ReactNode
  /** `chip` is a compact pill; `card` adds a secondary description line. */
  variant?: 'chip' | 'card'
  description?: ReactNode
}

export function PromptSuggestion({
  icon,
  variant = 'chip',
  description,
  className,
  children,
  type = 'button',
  ...props
}: PromptSuggestionProps) {
  if (variant === 'card') {
    return (
      <button
        type={type}
        className={cn(
          'group flex flex-col items-start gap-1 rounded-xl border bg-card p-3 text-left transition-[border-color,background-color,transform] duration-150 ease-out hover:border-foreground/20 hover:bg-muted/50 active:scale-[0.98]',
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-2 text-sm font-medium">
          {icon && <span className="text-muted-foreground transition-colors group-hover:text-accent [&_svg]:size-4">{icon}</span>}
          {children}
        </span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </button>
    )
  }

  return (
    <button
      type={type}
      className={cn(
        'group inline-flex h-8 items-center gap-1.5 rounded-full border bg-card px-3 text-sm whitespace-nowrap text-muted-foreground transition-[color,border-color,background-color,transform] duration-150 ease-out hover:border-foreground/20 hover:text-foreground active:scale-[0.97]',
        className,
      )}
      {...props}
    >
      {icon && <span className="transition-colors group-hover:text-accent [&_svg]:size-3.5">{icon}</span>}
      {children}
    </button>
  )
}

export function PromptSuggestionGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div role="group" className={cn('flex flex-wrap gap-2', className)} {...props} />
}
