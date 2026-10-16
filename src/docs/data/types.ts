export interface PropDoc {
  name: string
  type: string
  default?: string
  description: string
}

export interface PartDoc {
  /** e.g. `ChatMessage.Bubble` */
  name: string
  description?: string
  props?: PropDoc[]
}

export interface DemoSection {
  /** Demo file name without extension, e.g. `with-markdown` → with-markdown.tsx next to meta.ts. */
  demo: string
  title: string
  description?: string
}

export interface ComponentDoc {
  /** PascalCase, matches the registry entry, e.g. `ChatMessage`. */
  name: string
  description: string
  /** Rendered in order, same order as the reference docs (Usage first). */
  sections: DemoSection[]
  /** Composition snippet shown under "Anatomy". */
  anatomy?: string
  cssClasses?: { className: string; description: string }[]
  /** Extra prose sections such as "Performance". */
  notes?: { title: string; body: string }[]
  api?: PartDoc[]
}
