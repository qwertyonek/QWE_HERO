import { useId, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends ComponentProps<'span'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'current' | 'accent' | 'success' | 'warning' | 'danger'
}

/** Two gradient arcs (bright leading arc, fading trailing arc) rotating at 0.75s. */
export function Spinner({ size = 'md', color = 'accent', className, ...props }: SpinnerProps) {
  const id = useId()

  return (
    <span data-slot="spinner" role="status" aria-label="Loading" className={cn('spinner', `spinner--${color}`, `spinner--${size}`, className)} {...props}>
      <svg data-slot="spinner-icon" viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-a`} x1="50%" x2="50%" y1="5%" y2="92%">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id={`${id}-b`} x1="50%" x2="50%" y1="15%" y2="87%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <g fill="none" transform="translate(1.5 1.625)">
          <path
            fill={`url(#${id}-a)`}
            d="M8.75.02a1.5 1.5 0 0 1 .5 2.96A7.5 7.5 0 0 0 3 10.38a7.5 7.5 0 0 0 7.5 7.5v3C4.7 20.88 0 16.17 0 10.38 0 5.23 3.73.87 8.75.02"
          />
          <path
            fill={`url(#${id}-b)`}
            d="M15.39 2.67a1.5 1.5 0 0 1 2.12-.11A10.48 10.48 0 0 1 21 10.38c0 5.8-4.7 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5-13.09 1.5 1.5 0 0 1-.11-2.12"
          />
        </g>
      </svg>
    </span>
  )
}
