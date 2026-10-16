import { ChatLoader } from '@/components/qwe-hero/ai'

export default function ChatLoaderUsage() {
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-8">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Dots</span>
        <ChatLoader.Dots />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Pulse</span>
        <ChatLoader.Pulse />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Spinner</span>
        <ChatLoader.Spinner />
      </div>
      <ChatLoader.Skeleton />
    </div>
  )
}
