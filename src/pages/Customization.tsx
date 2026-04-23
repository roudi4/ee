import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Upload, Scissors, Check } from "lucide-react"
import { PRODUCTS, TAILORS } from "@/lib/data"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"

export function Customization() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const productId = searchParams.get("product")
  const tailorId = searchParams.get("tailor")
  
  const product = PRODUCTS.find(p => p.id === productId)
  const preselectedTailor = TAILORS.find(t => t.id === tailorId)

  const [step, setStep] = useState(1)
  const [selectedTailor, setSelectedTailor] = useState(preselectedTailor?.id || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
    setTimeout(() => {
      navigate("/dashboard")
    }, 2000)
  }

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-stone-900 text-white rounded-full flex items-center justify-center mb-6"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <h2 className="font-serif text-3xl font-medium mb-4">Request Sent Successfully!</h2>
        <p className="text-stone-500 max-w-md">
          Your customization request has been sent to the tailor. You will be notified once they review and accept your request.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 max-w-4xl">
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-medium mb-2">Custom Tailoring Request</h1>
        <p className="text-stone-500">Provide details for your custom piece and select a tailor.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-stone-900' : 'bg-stone-200'}`} />
        <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-stone-900' : 'bg-stone-200'}`} />
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {product && (
              <div className="flex gap-6 p-6 bg-stone-50 rounded-2xl border border-stone-100">
                <img src={product.image} alt={product.title} className="w-24 h-32 object-cover rounded-lg" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Base Product: {product.title}</h3>
                  <p className="text-stone-500 text-sm">We'll use this as the foundation for your custom piece.</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="block font-medium">Inspiration & References</label>
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-stone-50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-stone-400 mb-4" />
                <p className="font-medium text-sm">Click to upload images</p>
                <p className="text-xs text-stone-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block font-medium">Customization Notes</label>
              <textarea 
                className="w-full h-32 p-4 rounded-xl border border-stone-200 bg-white outline-none focus:border-stone-400 resize-none"
                placeholder="Describe your vision, specific measurements, fabric preferences, or alterations needed..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Your Height</label>
                <input type="text" placeholder="e.g., 5'8&quot; or 173cm" className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Standard Size</label>
                <select className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400 bg-white">
                  <option>Select Size</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="button" size="lg" onClick={() => setStep(2)}>Continue to Tailor Selection</Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h3 className="font-medium text-xl">Select a Tailor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TAILORS.map(tailor => (
                <Card 
                  key={tailor.id} 
                  className={`cursor-pointer transition-all ${selectedTailor === tailor.id ? 'ring-2 ring-stone-900 border-transparent' : 'hover:border-stone-300'}`}
                  onClick={() => setSelectedTailor(tailor.id)}
                >
                  <CardContent className="p-6 flex gap-4 items-center">
                    <img src={tailor.image} alt={tailor.name} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-medium">{tailor.name}</h4>
                      <p className="text-sm text-stone-500">{tailor.location}</p>
                      <div className="flex gap-1 mt-2">
                        {tailor.specialties.slice(0, 2).map(s => (
                          <span key={s} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-stone-100 rounded-sm">{s}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" size="lg" className="gap-2" disabled={!selectedTailor}>
                <Scissors className="h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  )
}
