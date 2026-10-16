import type { HighlighterCore } from 'shiki/core'

// Curated language set keeps the bundle small; extend as needed.
const languages = {
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  bash: () => import('shiki/langs/bash.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
} as const

export type SupportedLanguage = keyof typeof languages

const aliases: Record<string, SupportedLanguage> = {
  ts: 'typescript',
  js: 'javascript',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  py: 'python',
  yml: 'yaml',
  md: 'markdown',
}

export function resolveLanguage(lang?: string): SupportedLanguage | null {
  if (!lang) return null
  const key = lang.toLowerCase()
  if (key in languages) return key as SupportedLanguage
  return aliases[key] ?? null
}

let highlighterPromise: Promise<HighlighterCore> | null = null
const loaded = new Set<SupportedLanguage>()

function getHighlighter() {
  highlighterPromise ??= Promise.all([import('shiki/core'), import('shiki/engine/javascript')]).then(
    ([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
        langs: [],
        engine: createJavaScriptRegexEngine(),
      }),
  )
  return highlighterPromise
}

/** Returns themed HTML (light/dark via CSS vars), or null for unsupported languages. */
export async function highlight(code: string, lang?: string): Promise<string | null> {
  const language = resolveLanguage(lang)
  if (!language) return null
  const highlighter = await getHighlighter()
  if (!loaded.has(language)) {
    await highlighter.loadLanguage(languages[language]())
    loaded.add(language)
  }
  return highlighter.codeToHtml(code, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
