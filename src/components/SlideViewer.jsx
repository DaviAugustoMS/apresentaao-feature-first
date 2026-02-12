export function SlideViewer({ slides, currentSlide }) {
  return (
    <div className="presentation-wrapper flex min-h-screen items-center justify-center p-5">
      <div className="presentation-container relative h-[720px] w-[1280px] overflow-hidden rounded-xl shadow-2xl">
        {slides.map((slide) => (
          <SlideComponent
            key={slide.id}
            slide={slide}
            isActive={slide.id === currentSlide}
          />
        ))}
      </div>
    </div>
  )
}

function SlideComponent({ slide, isActive }) {
  return (
    <div
      className={`slide-component absolute inset-0 transition-opacity duration-300 ${
        isActive ? 'z-10 opacity-100' : 'pointer-events-none opacity-0'
      }`}
      data-slide={slide.id}
    >
      {slide.styles?.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <div
        className="slide-content h-full w-full"
        dangerouslySetInnerHTML={{ __html: slide.content }}
      />
    </div>
  )
}
