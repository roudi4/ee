import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ShoppingBag, User, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/contexts/AuthContext"

export function Navbar() {
  const { user, login, logout } = useAuth()
  const [showLoginMenu, setShowLoginMenu] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold tracking-tight">Thread & Tailor</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors">Discover</Link>
            <Link to="/tailors" className="text-stone-600 hover:text-stone-900 transition-colors">Tailors</Link>
            <Link to="/customization" className="text-stone-600 hover:text-stone-900 transition-colors">Custom Request</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input 
              type="search" 
              placeholder="Search styles, tailors..." 
              className="h-10 w-64 rounded-full border border-stone-200 bg-stone-100 pl-10 pr-4 text-sm outline-none transition-all focus:border-stone-400 focus:bg-white focus:w-72"
            />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-xs font-medium uppercase tracking-wider px-2 py-1 bg-stone-200 text-stone-700 rounded-sm">
                {user.role}
              </span>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Button variant="outline" size="sm" onClick={() => setShowLoginMenu(!showLoginMenu)}>
                Login
              </Button>
              {showLoginMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-lg py-2 z-50">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-stone-100 transition-colors"
                    onClick={() => { login('client'); setShowLoginMenu(false); }}
                  >
                    Login as Client
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-stone-100 transition-colors"
                    onClick={() => { login('admin'); setShowLoginMenu(false); }}
                  >
                    Login as Admin
                  </button>
                </div>
              )}
            </div>
          )}

          <Link to="/checkout">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-stone-900"></span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
