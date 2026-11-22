import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { SECTIONS, type SectionId } from '../data'

/** Atraso escalonado da animação de entrada (80 ms por passo). */
export const delay = (n: number) => ({ '--d': Math.min(n, 8) }) as CSSProperties

/**
 * Seção com chamada (nome em mono maiúsculo) e título grande.
 * side: no desktop largo, o título fica numa coluna à esquerda, parado enquanto o conteúdo rola
 * (usado nas seções longas, para variar o ritmo da página). No celular, sempre em cima.
 */
export function Section({
  id,
  intro,
  side = false,
  children,
}: {
  id: SectionId
  intro?: ReactNode
  side?: boolean
  children: ReactNode
}) {
  const s = SECTIONS.find((x) => x.id === id)!
  const header = (
    <header className={`mb-9 max-w-2xl sm:mb-12 ${side ? 'lg:sticky lg:top-28 lg:mb-0' : ''}`} data-reveal>
      <p className="font-mono text-label tracking-[0.22em] text-orchid-soft uppercase">{s.label}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-lilac sm:text-5xl">{s.title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </header>
  )
  return (
    <section id={id} className="scroll-mt-20 py-14 sm:py-20">
      {side ? (
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <div>{header}</div>
          <div className="min-w-0">{children}</div>
        </div>
      ) : (
        <>
          {header}
          {children}
        </>
      )}
    </section>
  )
}

/** Rótulo interno (subtítulo dentro de uma seção): texto normal, seminegrito, sem mono. */
export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h4 className={`text-base font-semibold text-lilac ${className}`}>{children}</h4>
}

/** Situação com ponto (em vez de cápsula): o ponto só aparece quando está em andamento. */
export function StatusText({ status }: { status: string }) {
  const live = status.toLowerCase() === 'em andamento'
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${live ? 'text-lilac' : 'text-muted'}`}>
      {live && <span aria-hidden className="size-2 rounded-full bg-orchid-soft" />}
      {status.toLowerCase()}
    </span>
  )
}

/** Card com brilho que acompanha o mouse. */
export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div data-reveal style={style} onPointerMove={onMove} className={`card ${className}`}>
      {children}
    </div>
  )
}

/** Marca algo que ainda depende de confirmação do autor. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span className="text-muted italic">
      <span className="font-mono text-label text-orchid-soft not-italic">a confirmar:</span> {children}
    </span>
  )
}

export function ExtLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex items-center gap-1.5 font-mono text-label text-lilac underline decoration-orchid/60 hover:decoration-lilac ${className}`}
    >
      {children}
    </a>
  )
}

export function IconArrow({ className = 'size-4' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconCheck({ className = 'size-4' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  )
}

export function LiveDot() {
  return <span className="live-dot inline-block size-1.5 shrink-0 rounded-full bg-orchid-soft text-orchid-soft" aria-hidden />
}
