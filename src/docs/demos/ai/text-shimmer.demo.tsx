import { TextShimmer } from '@/components/qwe-hero/ai'

export default function TextShimmerDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <TextShimmer className="text-2xl font-semibold tracking-tight">Генерирую ответ…</TextShimmer>
      <TextShimmer duration={1.2} spread={25} className="font-mono text-sm">
        searching the web · 3 sources
      </TextShimmer>
    </div>
  )
}
