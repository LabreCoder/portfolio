import { useEffect, useRef } from 'react'

/**
 * Rastro de giz: o cursor (ou o dedo, no celular) risca a ardósia com giz orquídea, que some devagar.
 * Canvas fixo atrás do conteúdo; o laço de animação só roda enquanto há giz na tela.
 * Desligado para quem pede menos movimento.
 */
const COLORS = ['180,138,224', '123,63,166', '231,216,255'] // orchid-soft, orchid, um pouco de lilás

export function Chalk() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let last: { x: number; y: number } | null = null
    let idleFrames = 0
    let raf = 0

    // Um traço de giz: vários grãos pequenos e irregulares ao longo do segmento.
    const stroke = (x0: number, y0: number, x1: number, y1: number) => {
      const dist = Math.hypot(x1 - x0, y1 - y0)
      const steps = Math.max(1, Math.floor(dist / 1.4))
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const x = x0 + (x1 - x0) * t
        const y = y0 + (y1 - y0) * t
        for (let g = 0; g < 4; g++) {
          const c = COLORS[g === 3 ? 2 : Math.random() < 0.6 ? 0 : 1]
          ctx.fillStyle = `rgba(${c},${(0.3 + Math.random() * 0.5).toFixed(2)})`
          const s = 0.8 + Math.random() * 1.8
          ctx.fillRect(x + (Math.random() - 0.5) * 5, y + (Math.random() - 0.5) * 5, s, s)
        }
      }
    }

    // Apaga um pouco a cada quadro; para o laço quando não há mais giz.
    const loop = () => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.045)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalCompositeOperation = 'source-over'
      idleFrames += 1
      if (idleFrames < 160) raf = requestAnimationFrame(loop)
      else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        raf = 0
      }
    }

    const draw = (x: number, y: number) => {
      if (last && Math.hypot(x - last.x, y - last.y) < 120) stroke(last.x, last.y, x, y)
      last = { x, y }
      idleFrames = 0
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') draw(e.clientX, e.clientY)
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) draw(t.clientX, t.clientY)
    }
    const reset = () => (last = null)

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', reset)
    document.addEventListener('mouseleave', reset)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', reset)
      document.removeEventListener('mouseleave', reset)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="no-print pointer-events-none fixed inset-0 -z-[5] h-full w-full" />
}
