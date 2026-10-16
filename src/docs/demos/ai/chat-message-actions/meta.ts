import type { ComponentDoc } from '../../../data/types'

export default {
  name: 'ChatMessageActions',
  description: 'Inline action buttons for assistant and user messages.',
  sections: [
    { demo: 'usage', title: 'Usage', description: 'Preset copy, feedback, regenerate and overflow actions under a message.' },
    { demo: 'minimal', title: 'Minimal', description: 'A reduced action set for compact layouts.' },
    { demo: 'custom-icons', title: 'Custom Icons', description: 'Swap preset icons through the `icon` prop.' },
  ],
  anatomy: `import { ChatMessageActions } from '@/components/qwe-hero/ai'

<ChatMessageActions>
  <ChatMessageActions.Copy value={text} />
  <ChatMessageActions.ThumbsUp />
  <ChatMessageActions.Action aria-label="Share">...</ChatMessageActions.Action>
</ChatMessageActions>`,
  cssClasses: [
    { className: 'chat-message-actions', description: 'Root action row' },
    { className: 'chat-message-actions__action', description: 'Individual icon button' },
  ],
  api: [
    { name: 'ChatMessageActions', description: 'Root action group. Supports native div props.' },
    {
      name: 'ChatMessageActions.Action',
      description: 'Individual ghost icon button. Extends Button props.',
      props: [
        { name: 'aria-label', type: 'string', description: 'Accessible name, also used as the tooltip' },
        { name: 'tooltip', type: 'ReactNode | null', description: 'Custom tooltip; null disables it' },
      ],
    },
    {
      name: 'ChatMessageActions.Copy',
      description: 'Copies text and swaps to a check icon for 2s.',
      props: [
        { name: 'value', type: 'string', description: 'Text written to the clipboard' },
        { name: 'icon', type: 'ReactNode', description: 'Replaces the copy icon' },
        { name: 'copiedIcon', type: 'ReactNode', description: 'Replaces the check icon' },
        { name: 'onCopy', type: '() => void', description: 'Called after a successful copy' },
      ],
    },
    {
      name: 'ChatMessageActions.ThumbsUp, ThumbsDown',
      description: 'Feedback toggles.',
      props: [
        { name: 'isSelected', type: 'boolean', description: 'Controlled selected state' },
        { name: 'defaultSelected', type: 'boolean', default: 'false', description: 'Initial selected state' },
        { name: 'onSelectedChange', type: '(selected: boolean) => void', description: 'Selection handler' },
        { name: 'icon', type: 'ReactNode', description: 'Replaces the preset icon' },
      ],
    },
    { name: 'ChatMessageActions.Regenerate, More', description: 'Preset actions; accept `icon` and Button props.' },
  ],
} satisfies ComponentDoc
