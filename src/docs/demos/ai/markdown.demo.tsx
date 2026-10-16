import { Markdown } from '@/components/qwe-hero/ai'

const content = `## Сравнение подходов

Для стриминга ответа есть два варианта: **SSE** и *WebSocket*. Подробнее в [MDN](https://developer.mozilla.org/docs/Web/API/Server-sent_events).

| Подход | Направление | Переподключение |
| --- | --- | --- |
| SSE | сервер → клиент | встроено |
| WebSocket | двустороннее | вручную |

- [x] Безопасный рендер: сырой HTML экранируется
- [ ] Подсветка кода внутри блоков

> Для чата с LLM обычно хватает SSE: клиент шлёт POST, сервер стримит токены.

\`\`\`ts
const res = await fetch('/api/chat', { method: 'POST', body })
for await (const chunk of res.body!) render(chunk)
\`\`\`

Инлайн-код тоже работает: \`useChat()\`. А вот <script>alert(1)</script> останется текстом.`

export default function MarkdownDemo() {
  return <Markdown className="w-full max-w-2xl">{content}</Markdown>
}
