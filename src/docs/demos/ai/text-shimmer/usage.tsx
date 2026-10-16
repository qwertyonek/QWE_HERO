import { TextShimmer } from '@/components/qwe-hero/ai'

export default function TextShimmerUsage() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <TextShimmer>Thinking...</TextShimmer>
      <TextShimmer>Generating response...</TextShimmer>
    </div>
  )
}
