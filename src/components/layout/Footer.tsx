import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-semibold">Thread & Tailor</h3>
            <p className="text-sm text-stone-500 max-w-xs">
              A curated platform connecting fashion enthusiasts with master tailors for bespoke, made-to-measure clothing.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">Shop</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><Link to="/" className="hover:text-stone-900 transition-colors">All Products</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Collections</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">Tailoring</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><Link to="/tailors" className="hover:text-stone-900 transition-colors">Our Tailors</Link></li>
              <li><Link to="/customization" className="hover:text-stone-900 transition-colors">How it Works</Link></li>
              <li><Link to="/customization" className="hover:text-stone-900 transition-colors">Start a Request</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">Support</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><Link to="/" className="hover:text-stone-900 transition-colors">FAQ</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/" className="hover:text-stone-900 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Thread & Tailor. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
