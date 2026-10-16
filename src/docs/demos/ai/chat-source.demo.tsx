import { ChatSourceInline, ChatSourceList, type ChatSourceData } from '@/components/qwe-hero/ai'

const sources: ChatSourceData[] = [
  {
    title: 'Using server-sent events',
    url: 'https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events',
    siteName: 'MDN Web Docs',
    snippet: 'Developing a web application that uses server-sent events is straightforward: the server pushes text over a long-lived HTTP response.',
  },
  {
    title: 'The WebSocket API (WebSockets)',
    url: 'https://developer.mozilla.org/docs/Web/API/WebSockets_API',
    siteName: 'MDN Web Docs',
    snippet: 'Makes it possible to open a two-way interactive communication session between the browser and a server.',
  },
  {
    title: 'HTML Living Standard — Server-sent events',
    url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html',
    snippet: 'This specification defines an API for opening an HTTP connection for receiving push notifications from a server.',
  },
]

export default function ChatSourceDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-5">
      <p className="text-sm leading-7">
        SSE держит одно HTTP-соединение и сам переподключается
        <ChatSourceInline source={sources[0]} index={1} />, а WebSocket даёт двусторонний канал
        <ChatSourceInline source={sources[1]} index={2} />. Формат событий описан в стандарте
        <ChatSourceInline source={sources[2]} index={3} />.
      </p>
      <ChatSourceList sources={sources} />
    </div>
  )
}
