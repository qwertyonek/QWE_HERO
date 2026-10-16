import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-foreground text-background hover:bg-foreground/90',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
  outline: 'border bg-card hover:bg-muted',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
} as const

const sizes = {
  sm: 'h-8 gap-1.5 rounded-md px-3 text-xs',
  md: 'h-9 gap-2 rounded-lg px-4 text-sm',
  'icon-sm': 'size-7 rounded-md',
  icon: 'size-9 rounded-lg',
} as const

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function Button({ variant = 'default', size = 'md', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
