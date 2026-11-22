import { LABS, LABS_INTRO, WRITEUPS, type Writeup } from '../data'
import { Card, ExtLink, Pending, Section, delay } from './primitives'

/** Writeup no formato de relatório de pentest. Só aparece quando WRITEUPS tiver itens. */
function WriteupCard({ w }: { w: Writeup }) {
  const steps: [string, string][] = [
    ['Escopo', w.scope],
    ['Recon', w.recon],
    ['Achado', w.finding],
    ['Impacto', w.impact],
    ['Remediação', w.remediation],
  ]
  return (
    <Card className="p-6 sm:p-8">
      <p className="font-mono text-label text-muted">
        {w.platform} · {w.date}
      </p>
      <h4 className="mt-1 font-display text-2xl font-semibold text-lilac">{w.title}</h4>
      <ol className="mt-5 space-y-3">
        {steps.map(([k, v]) => (
          <li key={k} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
            <span className="text-sm leading-6 font-semibold text-orchid-soft">{k}</span>
            <span className="leading-relaxed">{v}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {w.tools.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
        {w.href && (
          <ExtLink href={w.href} className="ml-auto">
            writeup completo
          </ExtLink>
        )}
      </div>
    </Card>
  )
}

export function Labs() {
  return (
    <Section id="labs" intro={LABS_INTRO}>
      {/* Lista sem caixas: nome grande, foco e situação, separados por linhas. */}
      <ul className="border-t border-grape/70">
        {LABS.map((l, i) => {
          const live = l.status === 'Em andamento'
          return (
            <li
              key={l.name}
              data-reveal
              style={delay(i)}
              className="grid gap-1 border-b border-grape/70 py-5 transition-colors hover:bg-plum/25 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_9rem] sm:items-baseline sm:gap-8 sm:py-6"
            >
              <h3 className="font-display text-2xl font-semibold text-lilac">{l.name}</h3>
              <p className="leading-relaxed text-text/90">
                {l.focus}
                {l.pending && (
                  <span className="mt-1 block text-sm">
                    <Pending>{l.pending}</Pending>
                  </span>
                )}
              </p>
              <p className={`flex items-center gap-2 text-sm sm:justify-end ${live ? 'text-lilac' : 'text-muted'}`}>
                {live && <span aria-hidden className="size-2 rounded-full bg-orchid-soft" />}
                {l.status.toLowerCase()}
              </p>
            </li>
          )
        })}
      </ul>

      {WRITEUPS.length > 0 && (
        <div className="mt-14 space-y-5">
          <h3 className="font-display text-2xl font-semibold text-lilac">Writeups</h3>
          {WRITEUPS.map((w) => (
            <WriteupCard key={w.title} w={w} />
          ))}
        </div>
      )}
    </Section>
  )
}
