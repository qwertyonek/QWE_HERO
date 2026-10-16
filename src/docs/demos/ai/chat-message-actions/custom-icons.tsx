import { Clipboard, Heart } from 'lucide-react'
import { ChatMessage, ChatMessageActions } from '@/components/qwe-hero/ai'

const text = 'Swap preset icons via the icon prop.'

export default function ChatMessageActionsCustomIcons() {
  return (
    <ChatMessage.Assistant>
      <ChatMessage.Avatar alt="Assistant" fallback="AI" />
      <ChatMessage.Body>
        <ChatMessage.Content>{text}</ChatMessage.Content>
        <ChatMessage.Actions>
          <ChatMessageActions.Copy value={text} icon={<Clipboard className="size-4 text-accent" />} />
          <ChatMessageActions.ThumbsUp icon={<Heart className="size-4 text-success" />} />
        </ChatMessage.Actions>
      </ChatMessage.Body>
    </ChatMessage.Assistant>
  )
}
