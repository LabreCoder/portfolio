import { useEffect, useRef } from 'react'
import { LINKS, PROFILE, STATUS } from '../data'
import { ExtLink, IconArrow, delay } from './primitives'
import { openTerminal } from './Terminal'

/**
 * Hora local, atualizada a cada segundo direto no texto do elemento (sem re-renderizar o React),
 * para não refazer o layout da página a cada tique.
 */
function Clock({ timeZone }: { timeZone: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-BR', { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const tick = () => {
      if (ref.current) ref.current.textContent = fmt.format(new Date())
    }
    tick()
    const t = window.setInterval(tick, 1000)
    return () => window.clearInterval(t)
  }, [timeZone])
  return <span ref={ref} className="inline-block w-[8ch]" />
}

/**
 * Placa de ardósia com bordas lascadas (public/slate-plate.webp, gerada do filtro SVG).
 * Mostra só o que não se repete no resto da página: quem sou, o que está em andamento,
 * o convite para o terminal e a hora local.
 */
function SlatePlate() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden className="breathe absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(123_63_166/0.3),transparent)]" />
      <div className="float relative [contain:layout]">
        {/* fundo esticado de propósito para acompanhar o tamanho do texto; por isso é background, não <img> */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[url(/slate-plate.webp)] bg-[length:100%_100%] bg-no-repeat drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
        />
        <div className="relative px-8 py-9 font-mono text-sm sm:px-10 sm:py-11">
          <p className="text-muted">
            <span className="text-orchid-soft">$</span> whoami
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-lilac">{PROFILE.name.toLowerCase()}</p>

          <p className="mt-7 text-muted">
            <span className="text-orchid-soft">$</span> status
          </p>
          <p className="mt-2 text-lilac">{STATUS.ongoing}, em andamento</p>

          <button
            type="button"
            onClick={openTerminal}
            className="no-print group mt-7 flex items-center text-left text-muted hover:text-lilac"
          >
            <span className="text-orchid-soft">$</span>
            <span className="ml-2">
              <span className="max-sm:hidden">
                pressione <kbd className="rounded border border-lilac/25 px-1.5 text-lilac">~</kbd> para
              </span>
              <span className="sm:hidden">toque para</span> abrir o terminal
            </span>
            <span className="cursor ml-1.5 inline-block h-3.5 w-[0.55em] shrink-0 bg-lilac/80" aria-hidden />
          </button>

          <p className="mt-8 flex items-center justify-end border-t border-lilac/10 pt-4 text-label text-muted">
            <span className="tabular-nums" aria-label={`Hora local em ${STATUS.place}`}>
              <Clock timeZone={STATUS.timezone} /> · {STATUS.place}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const [first, ...rest] = PROFILE.name.split(' ')
  return (
    <header id="top" className="relative flex min-h-[100svh] flex-col justify-center pt-28 pb-20">
      <p data-reveal className="font-mono text-[0.8125rem] tracking-[0.2em] text-orchid-soft uppercase sm:text-sm">
        {PROFILE.eyebrow}
      </p>
      {/* Nome como protagonista: ocupa a largura da página. */}
      <h1
        data-reveal
        style={delay(1)}
        className="mt-3 -ml-[0.04em] font-display text-[clamp(3.6rem,18.8vw,16.5rem)] leading-[0.82] font-bold tracking-[-0.045em] whitespace-nowrap text-lilac max-sm:whitespace-normal"
      >
        {first}{' '}
        <span className="bg-gradient-to-r from-lilac via-orchid-soft to-orchid bg-clip-text text-transparent">{rest.join(' ')}</span>
      </h1>

      <div className="mt-12 grid w-full items-start gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <p data-reveal style={delay(2)} className="max-w-xl font-display text-2xl leading-snug font-medium text-lilac sm:text-[1.75rem]">
            {PROFILE.tagline}
          </p>
          <div data-reveal style={delay(4)} className="mt-9 flex flex-wrap gap-3">
            <a href="#projetos" className="btn btn-primary">
              Ver projetos <IconArrow />
            </a>
            <a href="#contato" className="btn btn-ghost">
              Entrar em contato
            </a>
          </div>
          <p data-reveal style={delay(5)} className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            <ExtLink href={LINKS.github}>GitHub</ExtLink>
            <ExtLink href={LINKS.linkedin}>LinkedIn</ExtLink>
            <ExtLink href={`mailto:${LINKS.email}`}>E-mail</ExtLink>
          </p>
        </div>

        <div data-reveal style={delay(3)}>
          <SlatePlate />
        </div>
      </div>

      <a
        href="#sumario"
        aria-label="Rolar para Sobre"
        className="no-print absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-label text-muted sm:flex"
      >
        rolar
        <span className="block h-10 w-px overflow-hidden bg-grape/50">
          <span className="scroll-line block h-full w-full bg-lilac" />
        </span>
      </a>
    </header>
  )
}
