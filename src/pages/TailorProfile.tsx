import { useParams, Link } from "react-router-dom"
import { motion } from "motion/react"
import { Star, MapPin, MessageSquare, Scissors } from "lucide-react"
import { TAILORS } from "@/lib/data"
import { Button } from "@/components/ui/Button"

export function TailorProfile() {
  const { id } = useParams()
  const tailor = TAILORS.find(t => t.id === id) || TAILORS[0]

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <img 
            src={tailor.image} 
            alt={tailor.name}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-stone-50"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="font-serif text-4xl font-medium mb-2">{tailor.name}</h1>
                <div className="flex items-center gap-4 text-stone-500">
                  <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {tailor.location}</span>
                  <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" /> {tailor.rating} ({tailor.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="icon"><MessageSquare className="h-5 w-5" /></Button>
                <Link to={`/customization?tailor=${tailor.id}`}>
                  <Button className="gap-2"><Scissors className="h-4 w-4" /> Request Customization</Button>
                </Link>
              </div>
            </div>
            <p className="text-stone-600 max-w-2xl leading-relaxed">
              {tailor.bio}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {tailor.specialties.map(spec => (
                <span key={spec} className="text-sm px-3 py-1 bg-stone-100 text-stone-700 rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="font-serif text-3xl font-medium">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tailor.portfolio.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100"
            >
              <img 
                src={img} 
                alt={`Portfolio piece ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
