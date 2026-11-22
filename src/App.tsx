import { useEffect } from 'react'
import { Background } from './components/Background'
import { Chalk } from './components/Chalk'
import { Terminal } from './components/Terminal'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Labs } from './components/Labs'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

/** Marca com .is-in cada [data-reveal] que entra na tela (uma vez só). */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  return (
    <div className="overflow-x-clip">
      <Background />
      <Chalk />
      <Terminal />
      <div className="read-progress no-print" aria-hidden />
      <a
        href="#sumario"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-plum focus:px-3 focus:py-2 focus:text-sm focus:text-lilac"
      >
        Pular para o conteúdo
      </a>
      <Nav />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <main>
          <About />
          <Experience />
          <Skills />
          <Labs />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
