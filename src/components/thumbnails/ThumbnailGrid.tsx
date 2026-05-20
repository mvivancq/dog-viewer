import type { ReactNode } from 'react'

interface ThumbnailGridProps {
  children: ReactNode
}

export function ThumbnailGrid({ children }: ThumbnailGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {children}
    </div>
  )
}
