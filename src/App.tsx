import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/docs/components/theme-provider'
import { DocsLayout } from '@/docs/docs-layout'

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <DocsLayout />
      </TooltipProvider>
    </ThemeProvider>
  )
}
