import { ComponentPreview } from '../components/component-preview'
import { CodeViewer } from '../components/code-viewer'
import type { ResolvedDoc } from '../data/demos'
import type { Category } from '../data/registry'

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="scroll-mt-20 text-xl font-semibold tracking-tight">
      <a href={`#${id}`} onClick={(e) => e.preventDefault()} className="hover:underline">
        {children}
      </a>
    </h2>
  )
}

export function ComponentPage({ category, doc }: { category: Category; doc: ResolvedDoc }) {
  return (
    <article className="space-y-12">
      <header className="space-y-2">
        <a href={`#/${category.slug}`} className="text-sm text-muted hover:text-foreground">
          {category.title}
        </a>
        <h1 className="text-3xl font-semibold tracking-tight">{doc.name.replace(/([a-z])([A-Z])/g, '$1 $2')}</h1>
        <p className="max-w-2xl text-muted">{doc.description}</p>
      </header>

      {doc.sectionsResolved.map((s) => (
        <section key={s.id} className="space-y-3">
          <SectionHeading id={s.id}>{s.title}</SectionHeading>
          {s.description && <p className="text-sm text-muted">{s.description}</p>}
          <ComponentPreview title={`${doc.name}-${s.id}`} files={s.files}>
            <s.Demo />
          </ComponentPreview>
        </section>
      ))}

      {doc.anatomy && (
        <section className="space-y-3">
          <SectionHeading id="anatomy">Anatomy</SectionHeading>
          <CodeViewer code={doc.anatomy} filename="anatomy.tsx" />
        </section>
      )}

      {doc.notes?.map((n) => (
        <section key={n.title} className="space-y-3">
          <SectionHeading id={n.title.toLowerCase()}>{n.title}</SectionHeading>
          <p className="text-sm leading-7 text-muted">{n.body}</p>
        </section>
      ))}

      {doc.cssClasses && doc.cssClasses.length > 0 && (
        <section className="space-y-3">
          <SectionHeading id="css-classes">CSS Classes</SectionHeading>
          <ul className="space-y-1.5 text-sm">
            {doc.cssClasses.map((c) => (
              <li key={c.className} className="flex flex-wrap gap-x-2">
                <code className="rounded-md bg-default px-1.5 py-0.5 font-mono text-[13px]">.{c.className}</code>
                <span className="text-muted">{c.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {doc.api && doc.api.length > 0 && (
        <section className="space-y-6">
          <SectionHeading id="api-reference">API Reference</SectionHeading>
          {doc.api.map((part) => (
            <div key={part.name} className="space-y-2">
              <h3 className="font-mono text-base font-semibold">{part.name}</h3>
              {part.description && <p className="text-sm text-muted">{part.description}</p>}
              {part.props && part.props.length > 0 && (
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-default/60 text-xs text-muted">
                      <tr>
                        {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                          <th key={h} className="px-3 py-2 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {part.props.map((p) => (
                        <tr key={p.name} className="border-t align-top">
                          <td className="px-3 py-2 font-mono text-[13px] whitespace-nowrap">{p.name}</td>
                          <td className="px-3 py-2 font-mono text-[12px] text-accent">{p.type}</td>
                          <td className="px-3 py-2 font-mono text-[12px] text-muted">{p.default ?? '-'}</td>
                          <td className="px-3 py-2 text-muted">{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  )
}
