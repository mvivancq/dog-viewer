import type { ReactNode } from 'react'

interface FavoritesPanelProps {
  children: ReactNode
}

export function FavoritesPanel({ children }: FavoritesPanelProps) {
  return (
    <aside className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Favorites</h3>
      {children}
    </aside>
  )
}
