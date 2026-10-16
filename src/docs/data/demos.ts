import type { ComponentType } from 'react'
import type { ComponentDoc } from './types'

// Layout: src/docs/demos/<category>/<kebab>/meta.ts + one <demo>.tsx per section.
// Component sources: src/components/qwe-hero/<category>/<kebab>.tsx or <kebab>/*.tsx.
// New files are picked up live via HMR.
const metas = import.meta.glob<{ default: ComponentDoc }>('../demos/*/*/meta.ts', { eager: true })
const demoModules = import.meta.glob<{ default: ComponentType }>('../demos/*/*/*.tsx', { eager: true })
const demoSources = import.meta.glob<string>('../demos/*/*/*.tsx', { eager: true, query: '?raw', import: 'default' })
const componentSources = import.meta.glob<string>('../../components/qwe-hero/*/**/*.{ts,tsx}', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const toKebab = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()

export interface SourceFile {
  filename: string
  code: string
}

export interface ResolvedSection {
  id: string
  title: string
  description?: string
  Demo: ComponentType
  files: SourceFile[]
}

export interface ResolvedDoc extends ComponentDoc {
  slug: string
  sectionsResolved: ResolvedSection[]
  sourceFiles: SourceFile[]
}

export function getComponentDoc(category: string, name: string): ResolvedDoc | null {
  const slug = toKebab(name)
  const base = `../demos/${category}/${slug}`
  const meta = metas[`${base}/meta.ts`]?.default
  if (!meta) return null

  const prefix = `../../components/qwe-hero/${category}/`
  const sourceFiles = Object.entries(componentSources)
    .filter(([path]) => path === `${prefix}${slug}.tsx` || path.startsWith(`${prefix}${slug}/`))
    .map(([path, code]) => ({ filename: path.replace('../../', ''), code }))

  const sectionsResolved = meta.sections.flatMap((section) => {
    const path = `${base}/${section.demo}.tsx`
    const mod = demoModules[path]
    if (!mod) return []
    return [
      {
        id: section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: section.title,
        description: section.description,
        Demo: mod.default,
        files: [{ filename: `${section.demo}.tsx`, code: demoSources[path] }, ...sourceFiles],
      },
    ]
  })

  return { ...meta, slug, sectionsResolved, sourceFiles }
}
