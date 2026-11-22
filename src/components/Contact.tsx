import { useState } from 'react'
import { CONTACT_TEXT, LINKS } from '../data'
import { ExtLink, IconArrow, IconCheck, Section } from './primitives'

function IconCopy() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  )
}

/**
 * Contato numa segunda placa de ardósia (public/slate-plate-wide.webp, mesma textura da placa do topo),
 * levemente girada, com o e-mail "escrito a giz". O site abre e fecha com a pedra.
 */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Sem permissão de área de transferência: o link mailto continua disponível.
    }
  }

  return (
    <Section id="contato" intro={CONTACT_TEXT}>
      <div data-reveal className="mx-auto max-w-3xl">
        <div className="relative rotate-[1.2deg] px-7 py-9 sm:px-14 sm:py-14">
          {/* fundo esticado de propósito para acompanhar o conteúdo; por isso é background, não <img> */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[url(/slate-plate-wide.webp)] bg-[length:100%_100%] bg-no-repeat drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
          />
          <div className="relative">
            <p className="font-mono text-sm text-muted">
              <span className="text-orchid-soft">$</span> cat contato
            </p>

            {/* E-mail a giz: tamanho fluido para caber numa linha até em 360 px. */}
            <a
              href={`mailto:${LINKS.email}`}
              className="mt-4 inline-block font-chalk text-[clamp(1.75rem,7.2vw,3.4rem)] leading-none font-semibold whitespace-nowrap text-lilac decoration-orchid-soft/70 decoration-2 underline-offset-[10px] hover:underline"
            >
              {LINKS.email}
            </a>
            {/* risco de giz embaixo do e-mail */}
            <svg aria-hidden viewBox="0 0 400 12" preserveAspectRatio="none" className="mt-2 h-3 w-full max-w-md text-orchid-soft/70">
              <path d="M2 7 C 60 3, 120 10, 190 6 S 330 3, 398 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={`mailto:${LINKS.email}`} className="btn btn-primary">
                Enviar e-mail <IconArrow />
              </a>
              <button
                type="button"
                onClick={copy}
                className="no-print inline-flex items-center gap-2 text-sm text-lilac hover:text-orchid-soft"
              >
                {copied ? <IconCheck className="size-4" /> : <IconCopy />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <span className="flex gap-6">
                <ExtLink href={LINKS.github} className="text-sm">
                  GitHub
                </ExtLink>
                <ExtLink href={LINKS.linkedin} className="text-sm">
                  LinkedIn
                </ExtLink>
              </span>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Endereço copiado' : ''}
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
