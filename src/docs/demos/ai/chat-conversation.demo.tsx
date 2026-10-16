import { useEffect, useRef, useState } from 'react'
import { Code2, Globe, Lightbulb, Search, Sparkles } from 'lucide-react'
import {
  ChainOfThought,
  ChatAvatar,
  ChatConversation,
  ChatLoader,
  ChatMessage,
  ChatMessageActions,
  ChatSourceList,
  ChatTool,
  Markdown,
  PromptInput,
  PromptSuggestion,
  PromptSuggestionGroup,
  type ChatSourceData,
  type ChatToolStatus,
  type ThoughtStep,
} from '@/components/qwe-hero/ai'

const sources: ChatSourceData[] = [
  {
    title: 'Using server-sent events',
    url: 'https://developer.mozilla.org/docs/Web/API/Server-sent_events/Using_server-sent_events',
    siteName: 'MDN Web Docs',
    snippet: 'The server pushes text over a long-lived HTTP response; the browser reconnects automatically.',
  },
  {
    title: 'The WebSocket API',
    url: 'https://developer.mozilla.org/docs/Web/API/WebSockets_API',
    siteName: 'MDN Web Docs',
    snippet: 'Two-way interactive communication session between the browser and a server.',
  },
]

const thoughts: Omit<ThoughtStep, 'status'>[] = [
  { id: 't1', title: 'Разбираю вопрос', content: 'Нужен транспорт для стриминга токенов от модели в браузер.' },
  { id: 't2', title: 'Ищу источники', icon: <Search /> },
  { id: 't3', title: 'Сравниваю варианты', content: 'SSE однонаправленный, WebSocket двусторонний.' },
]

const answer = `Для стриминга ответа LLM чаще всего хватает **SSE**: клиент отправляет POST, сервер отдаёт токены одним HTTP-ответом [1](#cite-1).

- переподключение встроено в \`EventSource\`
- работает через обычные прокси и HTTP/2
- WebSocket нужен, если клиент тоже шлёт поток данных [2](#cite-2)

\`\`\`ts
const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ prompt }) })
const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader()
for (;;) {
  const { value, done } = await reader.read()
  if (done) break
  append(value)
}
\`\`\``

// Seconds since a start mark; module-level so the purity lint knows it runs in handlers only.
const stopwatch = () => {
  const start = Date.now()
  return () => (Date.now() - start) / 1000
}

type Phase = 'thinking' | 'tool' | 'writing' | 'done'

type Message =
  | { id: string; role: 'user'; text: string }
  | {
      id: string
      role: 'assistant'
      phase: Phase
      step: number
      text: string
      tool: ChatToolStatus
      seconds?: number
      stopped?: boolean
    }

type Assistant = Extract<Message, { role: 'assistant' }>

const suggestions = [
  { icon: <Lightbulb />, text: 'SSE или WebSocket для чата с LLM?' },
  { icon: <Code2 />, text: 'Как стримить ответ через fetch?' },
  { icon: <Globe />, text: 'Найди документацию по EventSource' },
]

export default function ChatConversationDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [busy, setBusy] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => () => abortRef.current?.abort(), [])

  const patch = (id: string, fn: (m: Assistant) => Partial<Assistant>) =>
    setMessages((list) => list.map((m) => (m.id === id && m.role === 'assistant' ? { ...m, ...fn(m) } : m)))

  const respond = async (id: string) => {
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    setBusy(true)
    const elapsed = stopwatch()
    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, ms)
        ac.signal.addEventListener('abort', () => {
          clearTimeout(t)
          reject(new DOMException('Aborted', 'AbortError'))
        })
      })

    try {
      for (let step = 0; step < thoughts.length; step++) {
        patch(id, () => ({ step }))
        await sleep(900)
      }
      patch(id, () => ({ phase: 'tool', step: thoughts.length, seconds: elapsed(), tool: 'running' }))
      await sleep(1300)
      patch(id, () => ({ phase: 'writing', tool: 'success' }))
      let text = ''
      for (const token of answer.match(/\S+\s*/g) ?? []) {
        text += token
        patch(id, () => ({ text }))
        await sleep(30)
      }
      patch(id, () => ({ phase: 'done' }))
    } catch {
      patch(id, (m) => ({
        phase: 'done',
        stopped: true,
        seconds: m.seconds ?? elapsed(),
        tool: m.tool === 'running' ? 'error' : m.tool,
      }))
    } finally {
      if (abortRef.current === ac) {
        abortRef.current = null
        setBusy(false)
      }
    }
  }

  const send = (text: string) => {
    const assistantId = crypto.randomUUID()
    setMessages((list) => [
      ...list,
      { id: crypto.randomUUID(), role: 'user', text },
      { id: assistantId, role: 'assistant', phase: 'thinking', step: 0, text: '', tool: 'pending' },
    ])
    void respond(assistantId)
  }

  const regenerate = (id: string) => {
    patch(id, () => ({ phase: 'thinking', step: 0, text: '', tool: 'pending', seconds: undefined, stopped: false }))
    void respond(id)
  }

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-lg">
      <ChatConversation
        header={
          <div className="flex h-12 items-center gap-2 px-4 text-sm">
            <Sparkles className="size-4 text-accent" />
            <span className="font-medium">QWE Assistant</span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">demo · offline</span>
          </div>
        }
        emptyState={
          <div className="flex max-w-md flex-col items-center gap-4 text-center">
            <ChatAvatar className="size-10 bg-foreground text-background [&_svg]:size-5">
              <Sparkles />
            </ChatAvatar>
            <div>
              <p className="text-lg font-semibold tracking-tight">Чем помочь?</p>
              <p className="text-sm text-muted-foreground">Ответы симулируются локально: рассуждения, вызов инструмента, стриминг.</p>
            </div>
            <PromptSuggestionGroup className="justify-center">
              {suggestions.map((s) => (
                <PromptSuggestion key={s.text} icon={s.icon} onClick={() => send(s.text)}>
                  {s.text}
                </PromptSuggestion>
              ))}
            </PromptSuggestionGroup>
          </div>
        }
        composer={<PromptInput onSubmit={send} isLoading={busy} onStop={() => abortRef.current?.abort()} />}
      >
        {messages.map((m) =>
          m.role === 'user' ? (
            <ChatMessage key={m.id} role="user">
              {m.text}
            </ChatMessage>
          ) : (
            <ChatMessage
              key={m.id}
              role="assistant"
              header={
                <div className="w-full space-y-2">
                  <ChainOfThought
                    isStreaming={m.phase === 'thinking'}
                    duration={m.seconds}
                    steps={thoughts.map((t, i) => ({
                      ...t,
                      status: i < m.step ? 'complete' : i === m.step && m.phase === 'thinking' ? 'active' : 'pending',
                    }))}
                  />
                  {m.phase !== 'thinking' && (
                    <ChatTool
                      name="search_docs"
                      icon={<Search />}
                      description="SSE vs WebSocket"
                      status={m.tool}
                      durationMs={1300}
                      args={{ query: 'server-sent events vs websocket' }}
                      result={m.tool === 'success' ? { found: sources.length } : undefined}
                      error={m.tool === 'error' ? 'Прервано пользователем' : undefined}
                    />
                  )}
                </div>
              }
              actions={
                m.phase === 'done' ? <ChatMessageActions content={m.text} onRegenerate={busy ? undefined : () => regenerate(m.id)} /> : undefined
              }
            >
              {m.text ? (
                <div className="space-y-4">
                  <Markdown sources={sources}>{m.text}</Markdown>
                  {m.phase === 'done' && !m.stopped && <ChatSourceList sources={sources} />}
                  {m.stopped && <p className="text-xs text-muted-foreground italic">Генерация остановлена</p>}
                </div>
              ) : m.phase === 'writing' ? (
                <ChatLoader />
              ) : m.stopped ? (
                <p className="text-xs text-muted-foreground italic">Генерация остановлена</p>
              ) : undefined}
            </ChatMessage>
          ),
        )}
      </ChatConversation>
    </div>
  )
}
