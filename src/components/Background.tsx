import { useEffect, useRef } from 'react'

/**
 * Fundo de ardósia numa camada fixa: textura com veios na diagonal,
 * uma faixa de luz que passa devagar e um brilho de orquídea que respira.
 * Do topo para baixo, uma camada escura vai acalmando a pedra (lousa "limpa" para leitura).
 */
export function Background() {
  const calm = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Só muda a opacidade de uma camada (barato): 0 no topo, 1 depois de uma tela de rolagem.
    const update = () => {
      const t = Math.min(window.scrollY / (window.innerHeight * 0.9), 1)
      if (calm.current) calm.current.style.opacity = t.toFixed(3)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div aria-hidden className="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night">
      {/* Textura pré-renderizada (public/slate*.webp) a partir do filtro SVG de camadas + veios com luz
          rasante. Gerar a imagem uma vez evita que o navegador recalcule o filtro em tela cheia. */}
      <img
        src={`${import.meta.env.BASE_URL}slate.webp`}
        srcSet={`${import.meta.env.BASE_URL}slate-sm.webp 1000w, ${import.meta.env.BASE_URL}slate.webp 1920w`}
        sizes="100vw"
        alt=""
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="sweep" />
      {/* brilho feito com gradiente radial (sem filtro de desfoque, que pesa no celular) */}
      <div className="breathe absolute -top-72 right-[-20%] size-[52rem] rounded-full bg-[radial-gradient(closest-side,rgb(74_31_111/0.32),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(11_11_16/0.85)_100%)]" />
      {/* camada que acalma a pedra abaixo do topo: a textura continua visível, mas recua */}
      <div ref={calm} className="absolute inset-0 bg-night/60 opacity-0" />
    </div>
  )
}
