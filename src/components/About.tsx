import { NOW, PROFILE, SUMMARY } from '../data'
import { LiveDot, Section, delay } from './primitives'

export function About() {
  return (
    <Section id="sumario">
      <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
        {SUMMARY.map((p, i) => (
          <p key={p} data-reveal style={delay(i)}>
            {p}
          </p>
        ))}
      </div>

      {/* Dados rápidos em linha, sem caixa. */}
      <dl data-reveal className="mt-10 grid gap-6 sm:grid-cols-3">
        {PROFILE.meta.map((m) => (
          <div key={m.label} className="border-l-2 border-orchid pl-4">
            <dt className="text-sm text-muted">{m.label}</dt>
            <dd className="mt-1 text-lilac">{m.value}</dd>
          </div>
        ))}
      </dl>

      {/* Agora: o que está acontecendo neste momento (atualizado à mão, com data). */}
      <div data-reveal className="mt-16 border-y border-grape/70 py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold text-lilac">Agora</h3>
          <p className="text-sm text-muted">atualizado em {NOW.updated}</p>
        </div>
        <dl className="mt-6 grid gap-6 md:grid-cols-3 md:gap-10">
          {NOW.items.map((it, i) => (
            <div key={it.label} data-reveal style={delay(i + 1)}>
              <dt className="flex items-center gap-2 font-semibold text-orchid-soft">
                {it.live && <LiveDot />}
                {it.label}
              </dt>
              <dd className="mt-1.5 leading-relaxed text-lilac">{it.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
