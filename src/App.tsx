/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Home } from "@/pages/Home"
import { Product } from "@/pages/Product"
import { Tailors } from "@/pages/Tailors"
import { TailorProfile } from "@/pages/TailorProfile"
import { Customization } from "@/pages/Customization"
import { Dashboard } from "@/pages/Dashboard"
import { Checkout } from "@/pages/Checkout"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/tailors" element={<Tailors />} />
              <Route path="/tailor/:id" element={<TailorProfile />} />
              <Route path="/customization" element={<Customization />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}
