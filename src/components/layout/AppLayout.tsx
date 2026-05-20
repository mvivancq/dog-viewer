import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <Outlet />
    </div>
  )
}
