import { useRef, useState, type KeyboardEvent } from 'react'
import { SKILL_GROUPS, type Context } from '../data'
import { Pending, Section } from './primitives'

// Linhas com evidência "a confirmar" só aparecem no ambiente de desenvolvimento (pnpm dev),
// para o site publicado não parecer inacabado. Ao confirmar a evidência, tire o pending no data.ts.
const SHOW_PENDING = import.meta.env.DEV

const CONTEXTS: Context[] = ['trabalho', 'lab', 'ensino', 'projeto', 'estudo']

const GROUPS = SKILL_GROUPS.map((g) => ({ ...g, skills: g.skills.filter((s) => SHOW_PENDING || !s.pending) })).filter(
  (g) => g.skills.length > 0,
)

// Rótulos curtos para as colunas no celular.
const SHORT: Record<Context, string> = { trabalho: 'trab.', lab: 'lab', ensino: 'ensino', projeto: 'proj.', estudo: 'estudo' }

const COLS = 'grid grid-cols-[minmax(0,1fr)_repeat(5,2.6rem)] items-center gap-x-0.5 sm:grid-cols-[minmax(0,13rem)_repeat(5,4.5rem)_minmax(0,1fr)] sm:gap-x-2 lg:grid-cols-[minmax(0,10.5rem)_repeat(5,3.9rem)_minmax(0,1fr)]'

/** Matriz de competências: abas por área; em cada linha, um ponto por contexto onde a ferramenta foi usada. */
export function Skills() {
  const [tab, setTab] = useState(0)
  const [open, setOpen] = useState<string | null>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const group = GROUPS[tab]

  // Setas esquerda/direita trocam de aba (padrão de acessibilidade para tabs).
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (tab + (e.key === 'ArrowRight' ? 1 : GROUPS.length - 1)) % GROUPS.length
    setTab(next)
    tabs.current[next]?.focus()
  }

  return (
    <Section id="competencias" side intro="Sem barras de nível: cada ferramenta mostra em que contexto foi usada e qual é a evidência.">
      <div data-reveal>
        <div role="tablist" aria-label="Áreas" className="no-print flex flex-wrap gap-2">
          {GROUPS.map((g, i) => (
            <button
              key={g.title}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`aba-${i}`}
              aria-selected={i === tab}
              aria-controls="painel-competencias"
              tabIndex={i === tab ? 0 : -1}
              onClick={() => setTab(i)}
              onKeyDown={onKey}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                i === tab ? 'border-orchid bg-plum text-lilac' : 'border-grape text-muted hover:text-lilac'
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        <div id="painel-competencias" role="tabpanel" aria-labelledby={`aba-${tab}`} className="mt-8">
          {/* cabeçalho das colunas */}
          <div className={`${COLS} border-b border-grape pb-2.5 text-[0.8125rem] text-text/80`} aria-hidden>
            <span>Ferramenta</span>
            {CONTEXTS.map((c) => (
              <span key={c} className="text-center max-sm:text-[0.68rem]">
                <span className="max-sm:hidden">{c}</span>
                <span className="sm:hidden">{SHORT[c]}</span>
              </span>
            ))}
            <span className="max-sm:hidden">Evidência</span>
          </div>

          <ul>
            {group.skills.map((s) => {
              const expanded = open === s.name
              return (
                <li key={s.name} className="border-b border-grape/50">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : s.name)}
                    aria-expanded={expanded}
                    className={`${COLS} w-full py-3 text-left transition-colors hover:bg-plum/30 sm:cursor-default`}
                  >
                    <span className="font-medium text-lilac">{s.name}</span>
                    {CONTEXTS.map((c) => {
                      const used = s.context.includes(c)
                      return (
                        <span key={c} className="grid place-items-center" aria-label={`${c}: ${used ? 'sim' : 'não'}`}>
                          <span
                            aria-hidden
                            className={`block size-2.5 rounded-full ${used ? 'bg-orchid-soft' : 'border border-[#6a5585]'}`}
                          />
                        </span>
                      )
                    })}
                    <span className="text-sm leading-6 text-text/85 max-sm:hidden">
                      {s.pending ? <Pending>{s.evidence}</Pending> : s.evidence}
                    </span>
                  </button>
                  {/* no celular a evidência aparece ao tocar na linha */}
                  {expanded && (
                    <p className="pb-3 text-sm leading-6 text-text/85 sm:hidden">
                      {s.pending ? <Pending>{s.evidence}</Pending> : s.evidence}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-sm text-muted sm:hidden">Toque numa ferramenta para ver a evidência.</p>
        </div>
      </div>
    </Section>
  )
}
