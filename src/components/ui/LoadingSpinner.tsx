interface LoadingSpinnerProps {
  label?: string
}

export function LoadingSpinner({ label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12 text-slate-500"
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
      <p className="text-sm">{label}</p>
    </div>
  )
}
