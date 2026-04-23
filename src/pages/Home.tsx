import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { MasonryGrid, MasonryItem } from "@/components/ui/MasonryGrid"
import { PRODUCTS } from "@/lib/data"
import { Button } from "@/components/ui/Button"

const CATEGORIES = ["All", "Chic", "Casual", "Elegant", "Streetwear"]

export function Home() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory)

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-12 text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-6xl font-medium tracking-tight"
        >
          Curated Fashion,<br />Tailored for You.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-stone-500 max-w-xl mx-auto"
        >
          Discover unique pieces and collaborate with master tailors to create clothing that fits your body and your style perfectly.
        </motion.p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <MasonryGrid>
        {filteredProducts.map((product, index) => (
          <MasonryItem key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-3xl bg-stone-100"
            >
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${product.height}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-white font-medium text-lg">{product.title}</h3>
                  <p className="text-stone-200">${product.price}</p>
                </div>
              </Link>
            </motion.div>
          </MasonryItem>
        ))}
      </MasonryGrid>
    </div>
  )
}
