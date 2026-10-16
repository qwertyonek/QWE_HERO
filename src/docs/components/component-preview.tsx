import { useState, type ReactNode } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { motion } from 'motion/react'
import { Code, Eye, Monitor, Smartphone, Tablet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CodeViewer } from './code-viewer'

const viewports = {
  mobile: { label: 'Mobile', icon: Smartphone, width: 375 },
  tablet: { label: 'Tablet', icon: Tablet, width: 768 },
  desktop: { label: 'Desktop', icon: Monitor, width: null },
} as const

type Viewport = keyof typeof viewports

interface ComponentPreviewProps {
  title: string
  description?: string
  code: string
  filename?: string
  children: ReactNode
}

export function ComponentPreview({ title, description, code, filename, children }: ComponentPreviewProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const width = viewports[viewport].width

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <Tabs.Root defaultValue="preview" className="rounded-xl border bg-card">
        <div className="flex items-center justify-between gap-2 border-b px-2 py-2">
          <Tabs.List className="flex gap-1">
            {(
              [
                ['preview', 'Preview', Eye],
                ['code', 'Code', Code],
              ] as const
            ).map(([value, label, Icon]) => (
              <Tabs.Trigger
                key={value}
                value={value}
                className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted-foreground transition-[color,background-color,transform] duration-150 ease-out hover:text-foreground active:scale-[0.97] data-[state=active]:bg-muted data-[state=active]:text-foreground"
              >
                <Icon className="size-4" />
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="hidden items-center gap-0.5 rounded-lg bg-muted p-0.5 sm:flex" role="radiogroup" aria-label="Viewport">
            {(Object.keys(viewports) as Viewport[]).map((key) => {
              const { label, icon: Icon } = viewports[key]
              const active = viewport === key
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={label}
                  title={label}
                  onClick={() => setViewport(key)}
                  className={cn(
                    'relative inline-flex size-7 items-center justify-center rounded-md transition-[color,transform] duration-150 ease-out active:scale-[0.97]',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`viewport-pill-${title}`}
                      className="absolute inset-0 rounded-md bg-card shadow-sm"
                      transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
                    />
                  )}
                  <Icon className="relative size-3.5" />
                </button>
              )
            })}
          </div>
        </div>

        <Tabs.Content value="preview" className="bg-muted/30 p-3 sm:p-6 rounded-b-xl">
          <div
            className="mx-auto overflow-hidden rounded-lg border bg-background transition-[max-width] duration-300 ease-out"
            style={{ maxWidth: width ?? '100%' }}
          >
            <div className="flex min-h-[280px] items-center justify-center p-6">{children}</div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="code" className="p-3">
          <CodeViewer code={code} filename={filename} />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  )
}
