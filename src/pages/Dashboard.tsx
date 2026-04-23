import { useState } from "react"
import { motion } from "motion/react"
import { Package, Clock, Heart, Settings, ChevronRight, Users, Check, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { useAuth } from "@/contexts/AuthContext"

const CLIENT_TABS = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "requests", label: "Custom Requests", icon: Clock },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
]

const ADMIN_TABS = [
  { id: "all_requests", label: "All Requests", icon: Clock },
  { id: "clients", label: "Clients", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Dashboard() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [activeTab, setActiveTab] = useState(isAdmin ? "all_requests" : "requests")

  const TABS = isAdmin ? ADMIN_TABS : CLIENT_TABS

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-medium mb-4">Please log in</h2>
        <p className="text-stone-500">You need to be logged in to view your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-serif text-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-medium">{user.name}</h2>
              <p className="text-sm text-stone-500">{user.email}</p>
              {isAdmin && <span className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 bg-stone-900 text-white rounded-sm mt-1 inline-block">Admin</span>}
            </div>
          </div>
          
          <nav className="space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Admin View: All Requests */}
          {activeTab === "all_requests" && isAdmin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-serif text-2xl font-medium mb-6">Manage Custom Requests</h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1515347619152-14123c126839?auto=format&fit=crop&q=80&w=200" alt="Dress" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 bg-yellow-100 text-yellow-800 rounded-sm">Pending Review</span>
                          <span className="text-sm text-stone-500">Req #CR-8492</span>
                        </div>
                        <h3 className="font-medium text-lg">Linen Summer Dress - Custom Fit</h3>
                        <p className="text-sm text-stone-500 mt-1">Client: Jane Doe</p>
                        <p className="text-sm text-stone-500">Submitted: Oct 24, 2023</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end gap-2">
                      <Button size="sm" className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white">
                        <Check className="h-4 w-4" /> Accept
                      </Button>
                      <Button variant="outline" size="sm" className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                        <X className="h-4 w-4" /> Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Client View: My Requests */}
          {activeTab === "requests" && !isAdmin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="font-serif text-2xl font-medium mb-6">Active Custom Requests</h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1515347619152-14123c126839?auto=format&fit=crop&q=80&w=200" alt="Dress" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 bg-yellow-100 text-yellow-800 rounded-sm">Pending Review</span>
                          <span className="text-sm text-stone-500">Req #CR-8492</span>
                        </div>
                        <h3 className="font-medium text-lg">Linen Summer Dress - Custom Fit</h3>
                        <p className="text-sm text-stone-500 mt-1">Tailor: Elena Rossi</p>
                        <p className="text-sm text-stone-500">Submitted: Oct 24, 2023</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button variant="outline" size="sm" className="gap-2">
                        View Details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=200" alt="Trousers" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 bg-blue-100 text-blue-800 rounded-sm">In Progress</span>
                          <span className="text-sm text-stone-500">Req #CR-8411</span>
                        </div>
                        <h3 className="font-medium text-lg">Tailored Trousers</h3>
                        <p className="text-sm text-stone-500 mt-1">Tailor: Marcus Chen</p>
                        <p className="text-sm text-stone-500">Est. Delivery: Nov 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <Button size="sm" className="gap-2">
                        Message Tailor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Shared Views */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl font-medium mb-6">Order History</h2>
              <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100">
                <Package className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                <h3 className="font-medium text-lg">No orders yet</h3>
                <p className="text-stone-500 mt-1">When you purchase ready-to-wear items, they will appear here.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl font-medium mb-6">Saved Items</h2>
              <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100">
                <Heart className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                <h3 className="font-medium text-lg">Your wishlist is empty</h3>
                <p className="text-stone-500 mt-1">Save items you love to review them later.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "clients" && isAdmin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl font-medium mb-6">Client Directory</h2>
              <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100">
                <Users className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                <h3 className="font-medium text-lg">No clients yet</h3>
                <p className="text-stone-500 mt-1">Clients will appear here once they make a request.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-serif text-2xl font-medium mb-6">Profile Settings</h2>
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input type="text" defaultValue={user.name} className="w-full h-10 px-3 rounded-lg border border-stone-200" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" defaultValue={user.email} className="w-full h-10 px-3 rounded-lg border border-stone-200" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
