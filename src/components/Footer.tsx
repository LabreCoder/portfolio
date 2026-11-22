import { LINKS } from '../data'
import { ExtLink } from './primitives'
import { openTerminal } from './Terminal'

/** Rodapé enxuto: o menu já fica fixo no topo, então aqui só o essencial. */
export function Footer() {
  return (
    <footer className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-grape/50 py-8 text-sm text-muted">
      <a href="#top" className="font-display text-lg font-semibold text-lilac">
        <span className="text-orchid-soft">~/</span>labre
      </a>
      <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <span>© 2026 João Labre</span>
        <button type="button" onClick={openTerminal} className="no-print text-orchid-soft hover:text-lilac">
          abrir o terminal <kbd className="ml-1 rounded border border-grape px-1.5 font-mono text-xs max-sm:hidden">~</kbd>
        </button>
        <ExtLink href={LINKS.portfolioRepo} className="no-print">
          código-fonte
        </ExtLink>
        <a href="#top" className="no-print hover:text-lilac">
          voltar ao topo ↑
        </a>
      </p>
    </footer>
  )
}
