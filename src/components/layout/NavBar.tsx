import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-800 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export function NavBar() {
  return (
    <nav
      className="border-b border-slate-200 bg-white"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink
          to="/"
          className="text-lg font-bold text-slate-900 hover:text-slate-700"
        >
          Turnitin Interview
        </NavLink>
        <ul className="flex items-center gap-1">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
