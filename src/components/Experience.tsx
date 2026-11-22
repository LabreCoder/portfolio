import { EXPERIENCES } from '../data'
import { Section, delay } from './primitives'

/** Lista editorial: período e empresa à esquerda, cargo e atividades à direita, separados por linhas. */
export function Experience() {
  return (
    <Section id="historico" side>
      <ol className="border-t border-grape/70">
        {EXPERIENCES.map((e, i) => (
          <li
            key={e.org + e.role}
            data-reveal
            style={delay(i)}
            className="group grid gap-4 border-b border-grape/70 py-9 transition-colors hover:bg-plum/25 sm:py-12 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[11rem_minmax(0,1fr)] lg:px-3"
          >
            <div>
              <p className="font-mono text-label text-lilac/85">{e.period}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-lilac sm:text-4xl">
                {e.org}
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-lilac">{e.role}</h3>
              <ul className="mt-4 space-y-2 leading-relaxed">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-orchid-soft transition-[width] group-hover:w-5" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              {e.tags.length > 0 && <p className="mt-5 font-mono text-label text-text/80">{e.tags.join('  ·  ')}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
