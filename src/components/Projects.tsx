import { LINKS, PROJECTS, PROJECT_FREE_SLOTS, type Project } from '../data'
import { Card, ExtLink, IconArrow, Label, Section, StatusText, delay } from './primitives'

function RepoLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-medium text-lilac">
      Ver código no GitHub
      <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="chip">
          {t}
        </span>
      ))}
    </div>
  )
}

/** Projeto com estudo de caso: ocupa a largura toda. Problema, o que construí, decisões e resultado. */
function CaseStudyCard({ p, i }: { p: Project; i: number }) {
  const c = p.caseStudy!
  return (
    <Card style={delay(i)} className="p-7 sm:p-10 md:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-orchid-soft">Estudo de caso</span>
        <StatusText status={p.status} />
      </div>
      <h3 className="mt-6 font-display text-3xl font-semibold text-lilac sm:text-4xl">{p.name}</h3>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{p.desc}</p>

      {/* listas sem marcador: o traço "—" fica reservado à Experiência */}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <Label>O problema</Label>
          <p className="mt-2 leading-relaxed">{c.problem}</p>

          <Label className="mt-8">O que construí</Label>
          <ul className="mt-2 space-y-2.5 leading-relaxed">
            {c.built.map((b) => {
              const [head, ...tail] = b.split(': ')
              return (
                <li key={b}>
                  <span className="text-orchid-soft">{head}:</span> {tail.join(': ')}
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <Label>Decisões técnicas</Label>
          <ul className="mt-2 space-y-2.5 leading-relaxed">
            {c.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <Label className="mt-8">Resultado</Label>
          <p className="mt-2 leading-relaxed">{c.result}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-grape/50 pt-6">
        <Chips items={p.stack} />
        <RepoLink href={p.href} />
      </div>
    </Card>
  )
}

/** Projeto sem estudo de caso: card na largura toda, texto à esquerda e tecnologias/link à direita. */
function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Card style={delay(i)} className="grid gap-6 p-7 sm:p-10 md:col-span-2 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-12">
      <div>
        <StatusText status={p.status} />
        <h3 className="mt-5 font-display text-2xl font-semibold text-lilac sm:text-3xl">{p.name}</h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{p.desc}</p>
      </div>
      <div className="flex flex-col justify-end gap-6">
        <Chips items={p.stack} />
        <RepoLink href={p.href} />
      </div>
    </Card>
  )
}

export function Projects() {
  return (
    <Section id="projetos">
      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (p.caseStudy ? <CaseStudyCard key={p.name} p={p} i={i} /> : <ProjectCard key={p.name} p={p} i={i} />))}
      </div>
      {/* Projetos ainda em finalização viram uma linha, em vez de caixas vazias. */}
      <p className="mt-8 text-muted" data-reveal>
        {PROJECT_FREE_SLOTS > 0 && <>Mais {PROJECT_FREE_SLOTS} projetos em finalização. </>}
        Outros repositórios em <ExtLink href={LINKS.github}>github.com/LabreCoder</ExtLink>
      </p>
    </Section>
  )
}
