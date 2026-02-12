export function SlideLoader() {
  return (
    <div className="slide-loader flex min-h-[50vh] flex-col items-center justify-center gap-4 text-slate-400">
      <i className="fas fa-spinner fa-spin text-4xl text-blue-400" />
      <span>Carregando slides...</span>
    </div>
  )
}
