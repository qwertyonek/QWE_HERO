import type { ComponentDoc } from '../../../data/types'

export default {
  name: 'TextShimmer',
  description: 'Shimmering status text for in-progress AI work.',
  sections: [
    { demo: 'usage', title: 'Usage', description: 'Wrap a short status label; color and size come from the surrounding text styles.' },
  ],
  anatomy: `import { TextShimmer } from '@/components/qwe-hero/ai'

<TextShimmer>Thinking...</TextShimmer>`,
  notes: [
    {
      title: 'Performance',
      body: 'The highlight is GPU-composited: an inert copy of the text masks a gradient that only animates translate, so no frame repaints the background. Set --spread to change the falloff width. With prefers-reduced-motion: reduce the animated layer is removed and the text renders solid.',
    },
  ],
  cssClasses: [
    { className: 'text-shimmer', description: 'Root element' },
    { className: 'text-shimmer__text', description: 'Readable text layer' },
    { className: 'text-shimmer__highlight', description: 'Inert copy that masks the animated highlight to the glyphs' },
  ],
  api: [
    {
      name: 'TextShimmer',
      description: 'Supports native span props.',
      props: [
        { name: 'children', type: 'ReactNode', description: 'Text content' },
        { name: 'className', type: 'string', description: 'Additional classes, including color and text size utilities' },
      ],
    },
  ],
} satisfies ComponentDoc
