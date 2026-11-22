import { EDUCATION } from '../data'
import { Pending, Section, delay } from './primitives'

/** Graduação como faixa de destaque (sem caixa) e cursos numa lista em 2 colunas. */
export function Education() {
  const { degree, courses } = EDUCATION
  return (
    <Section id="formacao">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-l-[3px] border-orchid pl-5 sm:pl-7">
        <div>
          <h3 className="font-display text-3xl font-semibold text-lilac sm:text-4xl">{degree.title}</h3>
          <p className="mt-2 text-text/85">{degree.org}</p>
        </div>
        <p className="text-sm text-orchid-soft">{degree.period}</p>
      </div>

      <h3 data-reveal className="mt-14 font-display text-xl font-semibold text-lilac">
        Cursos e trilhas
      </h3>
      <ul className="mt-4 grid gap-x-12 md:grid-cols-2">
        {courses.map((c, i) => (
          <li
            key={c.name}
            data-reveal
            style={delay(i)}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-grape/60 py-3"
          >
            <span className="text-lilac">
              {c.name}
              {c.pending && c.org && (
                <span className="ml-2 text-sm">
                  <Pending>{c.pending}</Pending>
                </span>
              )}
            </span>
            <span className="text-sm text-text/80">{c.org ?? <Pending>instituição</Pending>}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
