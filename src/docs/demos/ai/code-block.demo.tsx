import { CodeBlock } from '@/components/qwe-hero/ai'

const code = `import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</button>
}`

export default function CodeBlockDemo() {
  return (
    <div className="w-full max-w-xl space-y-4">
      <CodeBlock code={code} language="tsx" filename="counter.tsx" showLineNumbers />
      <CodeBlock code="npm install motion react-markdown shiki" language="bash" hideHeader />
    </div>
  )
}
