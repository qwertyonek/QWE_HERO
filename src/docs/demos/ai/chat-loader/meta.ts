import type { ComponentDoc } from '../../../data/types'

export default {
  name: 'ChatLoader',
  description: 'Typing indicators and response skeletons for pending assistant turns.',
  sections: [{ demo: 'usage', title: 'Usage', description: 'Show while an assistant response or a thread is loading.' }],
  anatomy: `import { ChatLoader } from '@/components/qwe-hero/ai'

<ChatLoader.Dots />
<ChatLoader.Pulse />
<ChatLoader.Spinner />
<ChatLoader.Skeleton />`,
  cssClasses: [
    { className: 'chat-loader__dots', description: 'Bouncing dots row' },
    { className: 'chat-loader__dot', description: 'Single dot' },
    { className: 'chat-loader__pulse', description: 'Pulsing accent dot' },
    { className: 'chat-loader__spinner', description: 'Spinner wrapper' },
    { className: 'chat-loader__skeleton', description: 'Message-shaped skeleton row' },
    { className: 'chat-loader__skeleton-avatar', description: 'Avatar placeholder' },
    { className: 'chat-loader__skeleton-block', description: 'Line group' },
    { className: 'chat-loader__skeleton-line', description: 'Individual line' },
  ],
  api: [
    {
      name: 'ChatLoader.Dots',
      description: 'Animated dots. Supports native span props.',
      props: [
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot size' },
        { name: 'label', type: 'string', description: 'Makes the loader a live status region with this label' },
      ],
    },
    { name: 'ChatLoader.Pulse', description: 'Pulsing dot. Supports native span props.', props: [{ name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot size' }] },
    { name: 'ChatLoader.Spinner', description: 'Accent spinner. Supports native span props.', props: [{ name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner size' }] },
    {
      name: 'ChatLoader.Skeleton',
      description: 'Chat-message-shaped skeleton. Supports native div props.',
      props: [
        { name: 'lines', type: 'number', default: '3', description: 'Number of text lines' },
        { name: 'hideAvatar', type: 'boolean', default: 'false', description: 'Omit the avatar placeholder' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Avatar and line size' },
      ],
    },
    { name: 'ChatLoader.SkeletonAvatar, SkeletonBlock, SkeletonLine', description: 'Composable primitives used by ChatLoader.Skeleton.' },
  ],
} satisfies ComponentDoc
