import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { Scissors, ShoppingBag, ChevronRight } from "lucide-react"
import { PRODUCTS } from "@/lib/data"
import { Button } from "@/components/ui/Button"

export function Product() {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0]

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link to="/" className="hover:text-stone-900">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/" className="hover:text-stone-900">{product.category}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-stone-900">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl overflow-hidden bg-stone-100"
        >
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-stone-500 mb-4">{product.category}</span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">{product.title}</h1>
          <p className="text-2xl text-stone-900 mb-8">${product.price}</p>
          
          <div className="space-y-6 mb-10">
            <p className="text-stone-600 leading-relaxed">
              A beautifully crafted piece designed for elegance and comfort. Available as ready-to-wear or fully customizable to your exact measurements by our expert tailors.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm border-y border-stone-200 py-6">
              <div>
                <span className="block text-stone-500 mb-1">Fabric</span>
                <span className="font-medium">100% Premium Material</span>
              </div>
              <div>
                <span className="block text-stone-500 mb-1">Care</span>
                <span className="font-medium">Dry clean only</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button size="lg" className="w-full gap-2">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart (Standard Size)
            </Button>
            
            {product.tailorAvailable && (
              <Link to={`/customization?product=${product.id}`}>
                <Button variant="outline" size="lg" className="w-full gap-2 border-stone-300">
                  <Scissors className="h-5 w-5" />
                  Customize with Tailor
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
