import type { CSSProperties, ComponentProps, ElementType } from 'react'
import { cn } from '@/lib/utils'

export interface TextShimmerProps extends ComponentProps<'span'> {
  /** Element to render. Defaults to `span`. */
  as?: ElementType
  /** Seconds for one sweep. */
  duration?: number
  /** Width of the highlight band, in percent of the text width. */
  spread?: number
}

export function TextShimmer({ as: Comp = 'span', duration = 2, spread = 15, className, style, ...props }: TextShimmerProps) {
  const from = 50 - spread
  const to = 50 + spread

  return (
    <Comp
      className={cn('inline-block animate-shimmer bg-clip-text text-transparent', className)}
      style={
        {
          '--qh-shimmer-duration': `${duration}s`,
          backgroundImage: `linear-gradient(90deg, var(--color-muted-foreground) ${from}%, var(--color-foreground) 50%, var(--color-muted-foreground) ${to}%)`,
          backgroundSize: '250% 100%',
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  )
}
