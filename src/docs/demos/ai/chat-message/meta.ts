import type { ComponentDoc } from '../../../data/types'

export default {
  name: 'ChatMessage',
  description: 'Composable user and assistant message layouts for AI chat.',
  sections: [
    { demo: 'usage', title: 'Usage', description: 'Compose assistant and user turns from avatars, bubbles, media, markdown, actions and attachments.' },
    { demo: 'with-markdown', title: 'With Markdown', description: 'Render assistant responses as rich markdown.' },
    { demo: 'loading', title: 'Loading', description: 'A pending assistant turn.' },
  ],
  anatomy: `import { ChatMessage, Markdown } from '@/components/qwe-hero/ai'

<ChatMessage.Assistant>
  <ChatMessage.Avatar alt="Assistant" fallback="AI" show />
  <ChatMessage.Body>
    <ChatMessage.Content>
      <Markdown>{response}</Markdown>
    </ChatMessage.Content>
  </ChatMessage.Body>
</ChatMessage.Assistant>

<ChatMessage.User>
  <ChatMessage.Bubble>
    <ChatMessage.Content>Hello</ChatMessage.Content>
  </ChatMessage.Bubble>
</ChatMessage.User>`,
  cssClasses: [
    { className: 'chat-message--assistant', description: 'Assistant message row' },
    { className: 'chat-message--user', description: 'User message wrapper' },
    { className: 'chat-message__avatar', description: 'Avatar slot' },
    { className: 'chat-message__body', description: 'Assistant body column' },
    { className: 'chat-message__bubble', description: 'User bubble' },
    { className: 'chat-message__content', description: 'Message content' },
    { className: 'chat-message__actions', description: 'Action row' },
  ],
  api: [
    { name: 'ChatMessage.Assistant', description: 'Assistant message root. Supports native div props.' },
    { name: 'ChatMessage.User', description: 'User message root. Supports native div props.' },
    {
      name: 'ChatMessage.Avatar',
      description: 'Avatar slot for assistant messages. Extends Avatar props.',
      props: [{ name: 'show', type: 'boolean', default: 'true', description: 'Render a same-size spacer instead, for grouped turns' }],
    },
    { name: 'ChatMessage.Body', description: 'Assistant content column.' },
    { name: 'ChatMessage.Bubble', description: 'User message bubble.' },
    { name: 'ChatMessage.Content', description: 'Message text / content slot.' },
    { name: 'ChatMessage.Media', description: 'Vertical stack for attachments and media.' },
    { name: 'ChatMessage.Actions', description: 'Container for message actions; fades in on hover.' },
  ],
} satisfies ComponentDoc
