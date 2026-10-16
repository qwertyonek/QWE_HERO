import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export type TextShimmerProps = ComponentProps<'span'>

/**
 * Shimmering placeholder text. The highlight is an inert copy of the text used as a mask over a
 * gradient animated with `translate` only, so frames never repaint the background.
 * Tune the falloff width with the `--spread` custom property.
 */
export function TextShimmer({ className, children, ...props }: TextShimmerProps) {
  return (
    <span data-slot="text-shimmer" className={cn('text-shimmer', className)} {...props}>
      <span data-slot="text-shimmer-text" className="text-shimmer__text">
        {children}
      </span>
      <span data-slot="text-shimmer-highlight" className="text-shimmer__highlight" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}
