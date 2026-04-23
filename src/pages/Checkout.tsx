import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "motion/react"
import { Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"

export function Checkout() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-stone-900 text-white rounded-full flex items-center justify-center mb-6"
        >
          <Check className="h-10 w-10" />
        </motion.div>
        <h2 className="font-serif text-3xl font-medium mb-4">Payment Successful!</h2>
        <p className="text-stone-500 max-w-md">
          Thank you for your order. We've sent a confirmation email with your order details.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12 max-w-5xl">
      <h1 className="font-serif text-3xl font-medium mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h2 className="text-xl font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
                <input type="text" placeholder="Last Name" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
                <input type="text" placeholder="Address" required className="col-span-2 w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
                <input type="text" placeholder="City" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
                <input type="text" placeholder="Postal Code" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-4">Payment</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400 font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiration Date</label>
                      <input type="text" placeholder="MM/YY" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CVC</label>
                      <input type="text" placeholder="123" required className="w-full h-12 px-4 rounded-xl border border-stone-200 outline-none focus:border-stone-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-stone-50 rounded-3xl p-6 border border-stone-100">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-stone-200 rounded-md overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1515347619152-14123c126839?auto=format&fit=crop&q=80&w=100" alt="Item" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Linen Summer Dress</h4>
                  <p className="text-stone-500 text-sm">Size: M</p>
                  <p className="font-medium mt-1">$120.00</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 py-4 border-y border-stone-200 mb-6 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span>$15.00</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Taxes</span>
                <span>$10.80</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-lg mb-8">
              <span>Total</span>
              <span>$145.80</span>
            </div>

            <Button 
              type="submit" 
              form="checkout-form" 
              size="lg" 
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : (
                <>
                  <Lock className="h-4 w-4" />
                  Pay $145.80
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-stone-400 mt-4">
              Payments are secure and encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
