import type { ComponentType } from 'react'

// Convention: src/docs/demos/<category>/<kebab-name>.demo.tsx renders the demo,
// src/components/qwe-hero/<category>/<kebab-name>.tsx holds the component.
// Dropping a new demo file in place makes it show up live via HMR.
const demoModules = import.meta.glob<{ default: ComponentType }>('../demos/*/*.demo.tsx', { eager: true })
const demoSources = import.meta.glob<string>('../demos/*/*.demo.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
})
const componentSources = import.meta.glob<string>('../../components/qwe-hero/*/*.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const toKebab = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()

export interface DemoFile {
  filename: string
  code: string
}

export interface DemoEntry {
  Demo: ComponentType
  files: DemoFile[]
}

export function getDemo(category: string, name: string): DemoEntry | null {
  const kebab = toKebab(name)
  const demoPath = `../demos/${category}/${kebab}.demo.tsx`
  const mod = demoModules[demoPath]
  if (!mod) return null

  const componentPath = `../../components/qwe-hero/${category}/${kebab}.tsx`
  const files: DemoFile[] = [{ filename: `${kebab}.demo.tsx`, code: demoSources[demoPath] }]
  if (componentSources[componentPath]) {
    files.push({ filename: `components/qwe-hero/${category}/${kebab}.tsx`, code: componentSources[componentPath] })
  }
  return { Demo: mod.default, files }
}
