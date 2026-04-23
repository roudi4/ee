import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Star, MapPin } from "lucide-react"
import { TAILORS } from "@/lib/data"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"

export function Tailors() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTailors = TAILORS.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="max-w-2xl mx-auto text-center mb-12 space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-medium">Our Master Tailors</h1>
        <p className="text-stone-500">
          Connect with world-class artisans ready to bring your vision to life.
        </p>
        <div className="pt-4">
          <input 
            type="search" 
            placeholder="Search by name or specialty..." 
            className="w-full max-w-md h-12 rounded-full border border-stone-200 bg-white px-6 outline-none transition-all focus:border-stone-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTailors.map((tailor, index) => (
          <motion.div
            key={tailor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-stone-200/60">
              <div className="h-32 bg-stone-100 relative">
                <img 
                  src={tailor.portfolio[0]} 
                  alt="Cover" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 left-6">
                  <img 
                    src={tailor.image} 
                    alt={tailor.name}
                    className="w-20 h-20 rounded-full border-4 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <CardContent className="pt-14 pb-6 px-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif text-xl font-medium">{tailor.name}</h3>
                    <div className="flex items-center text-sm text-stone-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {tailor.location}
                    </div>
                  </div>
                  <div className="flex items-center bg-stone-100 px-2 py-1 rounded-md text-sm font-medium">
                    <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
                    {tailor.rating}
                  </div>
                </div>
                
                <p className="text-sm text-stone-600 mt-4 line-clamp-2">
                  {tailor.bio}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {tailor.specialties.map(spec => (
                    <span key={spec} className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>

                <Link to={`/tailor/${tailor.id}`}>
                  <Button className="w-full" variant="outline">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
