import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '../data'

const LINKS = SECTIONS.filter((s) => s.id !== 'contato')

export function Nav() {
  const [active, setActive] = useState<SectionId | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e)
    const update = () => {
      setScrolled(window.scrollY > 24)
      setShowTop(window.scrollY > window.innerHeight * 1.5)
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const line = window.innerHeight * 0.4
      let current: HTMLElement | null = null
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el
      if (atBottom) current = els[els.length - 1]
      setActive(current ? (current.id as SectionId) : null)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const solid = scrolled || open
  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-grape/50 bg-night/92' : 'border-transparent'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-display text-xl font-semibold tracking-tight text-lilac">
          <span className="text-orchid-soft">~/</span>labre
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((s) => {
            const on = s.id === active
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? 'location' : undefined}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${on ? 'bg-plum text-lilac' : 'text-muted hover:text-lilac'}`}
                >
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>

        <a href="#contato" className="btn btn-primary hidden !py-2 lg:inline-flex">
          Fale comigo
        </a>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-grape/70 text-lilac lg:hidden"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="menu" className="mx-auto grid max-w-6xl gap-1 px-5 pb-5 sm:px-8 lg:hidden">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-baseline rounded-lg px-3 py-2.5 ${s.id === active ? 'bg-plum text-lilac' : 'text-text'}`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Voltar ao topo: aparece depois de uma tela e meia de rolagem. */}
      <a
        href="#top"
        aria-label="Voltar ao topo"
        tabIndex={showTop ? 0 : -1}
        className={`fixed right-4 bottom-4 grid size-11 place-items-center rounded-full border border-grape bg-night/90 text-lilac shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)] transition-[opacity,translate] duration-300 hover:border-orchid sm:right-6 sm:bottom-6 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </a>
    </header>
  )
}
