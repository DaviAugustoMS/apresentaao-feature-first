export function SlideNav({ current, total, onPrev, onNext }) {
  return (
    <nav className="slide-nav fixed bottom-6 left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-3 rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={current <= 1}
        className="rounded-lg px-3 py-2 text-slate-100 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Slide anterior"
      >
        <i className="fas fa-chevron-left" />
      </button>
      <span className="slide-counter font-mono text-sm text-slate-400 min-w-[80px] text-center">
        {current} / {total}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={current >= total}
        className="rounded-lg px-3 py-2 text-slate-100 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Próximo slide"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </nav>
  )
}
