import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { EXPERIENCES, LABS, LINKS, PROFILE, PROJECTS, SECTIONS, SKILL_GROUPS, STATUS } from '../data'

/**
 * Terminal escondido: abre com "~" (no teclado ABNT2 o til é tecla morta, então também vale a tecla
 * física dele) ou pelo botão do rodapé. Só leitura: os comandos mostram dados do próprio site.
 */
type Line = { kind: 'in' | 'out' | 'err'; text: string }

const PROMPT = 'visitante@labre:~$'

const HELP = [
  'comandos disponíveis:',
  '  whoami          quem sou eu',
  '  ls              seções do site',
  '  cd <seção>      vai até a seção (ex.: cd projetos)',
  '  projetos        repositórios públicos',
  '  experiencia     onde já trabalhei',
  '  labs            plataformas de CTF',
  '  skills          ferramentas por área',
  '  cat contato     como falar comigo',
  '  date            hora local em São Gonçalo',
  '  clear           limpa a tela',
  '  exit            fecha o terminal (ou Esc)',
]

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

function run(raw: string): string[] | 'clear' | 'exit' | { goto: string } {
  const [cmd = '', ...args] = raw.trim().split(/\s+/)
  const arg = slug(args.join(' '))
  switch (slug(cmd)) {
    case '':
      return []
    case 'help':
    case 'ajuda':
      return HELP
    case 'whoami':
      return [PROFILE.name, PROFILE.role, `foco: ${STATUS.focus}`, `procura: ${STATUS.seeking}`]
    case 'ls':
      if (arg === 'projetos') return PROJECTS.map((p) => `${p.name.padEnd(30)} ${p.status}`)
      return SECTIONS.map((s) => `${slug(s.label)}/`)
    case 'cd': {
      if (!arg || arg === '~' || arg === '..') return { goto: 'top' }
      const s = SECTIONS.find((x) => slug(x.label).startsWith(arg) || x.id.startsWith(arg))
      return s ? { goto: s.id } : [`cd: ${args.join(' ')}: seção não encontrada (tente ls)`]
    }
    case 'projetos':
      return PROJECTS.flatMap((p) => [`${p.name} [${p.status}]`, `  ${p.stack.join(' · ')}`, `  ${p.href}`])
    case 'experiencia':
      return EXPERIENCES.map((e) => `${e.period.padEnd(22)} ${e.role} · ${e.org}`)
    case 'labs':
      return LABS.map((l) => `${l.name.padEnd(16)} ${l.status}`)
    case 'skills':
      return SKILL_GROUPS.map(
        (g) => `${g.title}: ${g.skills.filter((s) => import.meta.env.DEV || !s.pending).map((s) => s.name).join(', ')}`,
      )
    case 'cat':
      if (arg.startsWith('contato')) return [`e-mail    ${LINKS.email}`, `github    ${LINKS.github}`, `linkedin  ${decodeURI(LINKS.linkedin)}`]
      return [`cat: ${args.join(' ') || '(vazio)'}: arquivo não encontrado (tente cat contato)`]
    case 'date':
      return [
        new Intl.DateTimeFormat('pt-BR', { timeZone: STATUS.timezone, dateStyle: 'full', timeStyle: 'medium' }).format(new Date()),
      ]
    case 'sudo':
      return ['permissão negada: este incidente será reportado. (brincadeira)']
    case 'clear':
      return 'clear'
    case 'exit':
      return 'exit'
    default:
      return [`${cmd}: comando não encontrado. Digite help.`]
  }
}

export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const input = useRef<HTMLInputElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable="true"]')) return
      const tilde = e.key === '~' || e.key === '`' || (e.key === 'Dead' && (e.code === 'Quote' || e.code === 'Backquote'))
      if (tilde && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault()
        opener.current = document.activeElement
        setOpen(true)
      }
    }
    const onOpen = () => {
      opener.current = document.activeElement
      setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-terminal', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-terminal', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    if (lines.length === 0) setLines([{ kind: 'out', text: 'Terminal do portfólio. Digite help para ver os comandos.' }])
    input.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      ;(opener.current as HTMLElement | null)?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight })
  }, [lines])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const cmd = value
    setValue('')
    setHIdx(-1)
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 30))
    const res = run(cmd)
    if (res === 'clear') return setLines([])
    if (res === 'exit') return setOpen(false)
    const echo: Line = { kind: 'in', text: cmd }
    if ('goto' in res) {
      setLines((l) => [...l, echo])
      setOpen(false)
      window.setTimeout(() => document.getElementById(res.goto)?.scrollIntoView({ behavior: 'smooth' }), 50)
      return
    }
    const isErr = res.length === 1 && /não encontrad|negada/.test(res[0])
    setLines((l) => [...l, echo, ...res.map((text) => ({ kind: isErr ? 'err' : 'out', text }) as Line)])
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = Math.min(hIdx + 1, history.length - 1)
      setHIdx(i)
      setValue(history[i] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = Math.max(hIdx - 1, -1)
      setHIdx(i)
      setValue(i >= 0 ? history[i] : '')
    }
  }

  if (!open) return null
  return (
    <div
      className="no-print fixed inset-0 z-[80] grid place-items-center bg-night/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal do portfólio"
        className="flex h-[min(32rem,80svh)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-grape bg-[#0e0b14]/95 font-mono text-[0.82rem] shadow-[0_30px_80px_-20px_rgb(123_63_166/0.45)]"
      >
        <div className="flex items-center justify-between border-b border-grape/60 px-4 py-2.5 text-label text-muted">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-orchid" aria-hidden />
            <span className="size-2.5 rounded-full bg-grape" aria-hidden />
            <span className="size-2.5 rounded-full bg-plum ring-1 ring-grape" aria-hidden />
            <span className="ml-2">~/labre</span>
          </span>
          <button type="button" onClick={() => setOpen(false)} className="hover:text-lilac">
            esc
          </button>
        </div>
        <div ref={screen} className="flex-1 overflow-y-auto px-4 py-3 leading-relaxed" onClick={() => input.current?.focus()}>
          {lines.map((l, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${l.kind === 'err' ? 'text-orchid-soft' : l.kind === 'in' ? 'text-lilac' : 'text-text'}`}>
              {l.kind === 'in' && <span className="text-orchid-soft">{PROMPT} </span>}
              {l.text}
            </p>
          ))}
          <form onSubmit={submit} className="flex items-center gap-2">
            <label htmlFor="term-input" className="shrink-0 text-orchid-soft">
              {PROMPT}
            </label>
            <input
              id="term-input"
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-lilac caret-orchid-soft outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

/** Botão para abrir o terminal sem teclado (celular). */
export function openTerminal() {
  window.dispatchEvent(new Event('open-terminal'))
}
