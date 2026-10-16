import { ChatLoader } from '@/components/qwe-hero/ai'

export default function ChatLoaderDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="flex flex-col items-center gap-2">
        <ChatLoader />
        <span className="font-mono text-xs text-muted-foreground">dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChatLoader variant="pulse" label="Ищу источники" />
        <span className="font-mono text-xs text-muted-foreground">pulse + label</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChatLoader variant="text" />
        <span className="font-mono text-xs text-muted-foreground">text</span>
      </div>
    </div>
  )
}
