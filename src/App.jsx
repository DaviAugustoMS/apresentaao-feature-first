import { useState, useEffect, useCallback } from 'react'
import { SlideLoader } from './components/SlideLoader'
import { SlideViewer } from './components/SlideViewer'
import { SlideNav } from './components/SlideNav'

const PAGES_COUNT = 32

function App() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(1)

  const loadAllSlides = useCallback(async () => {
    const order = Array.from({ length: PAGES_COUNT }, (_, i) => i + 1)
    const components = await Promise.all(
      order.map(async (num) => {
        const res = await fetch(`/pages/${num}.html`)
        const html = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const styles = doc.head.querySelectorAll('style')
        const bodyContent = doc.body.querySelector('.slide-container')
        if (!bodyContent) {
          throw new Error(`Página ${num}.html não possui .slide-container`)
        }
        return {
          id: num,
          styles: Array.from(styles).map((s) => s.textContent),
          content: bodyContent.innerHTML,
        }
      })
    )
    setSlides(components)
  }, [])

  useEffect(() => {
    loadAllSlides()
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [loadAllSlides])

  const goToSlide = useCallback(
    (index) => {
      if (index < 1 || index > PAGES_COUNT) return
      setCurrentSlide(index)
    },
    []
  )

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1)
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1)
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [currentSlide, goToSlide])

  if (loading) {
    return <SlideLoader />
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-400">
        Erro: {error}
      </div>
    )
  }

  return (
    <>
      <SlideViewer slides={slides} currentSlide={currentSlide} />
      <SlideNav
        current={currentSlide}
        total={PAGES_COUNT}
        onPrev={() => goToSlide(currentSlide - 1)}
        onNext={() => goToSlide(currentSlide + 1)}
      />
    </>
  )
}

export default App
