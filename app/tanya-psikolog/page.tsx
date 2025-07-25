"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Star, MapPin, Clock, MessageCircle, ArrowLeft, CreditCard, Phone, Sparkles, User } from "lucide-react"
import Link from "next/link"

interface Psychologist {
  id: string
  name: string
  title: string
  specialization: string[]
  experience: string
  rating: number
  price: string
  location: string
  photo: string
  isOnline: boolean
  description: string
  expertise: string[]
  workingHours: string
  languages: string[]
}

interface ChatMessage {
  id: string
  content: string
  sender: "user" | "psychologist" | "system"
  timestamp: Date
}

const psychologists: Psychologist[] = [
  {
    id: "1",
    name: "Dr. Sarah Wijaya",
    title: "Sp. Jiwa",
    specialization: ["Depresi", "Kecemasan"],
    experience: "12 tahun",
    rating: 4.9,
    price: "Rp 150.000",
    location: "Jakarta Selatan",
    photo: "/placeholder.svg?height=150&width=150",
    isOnline: true,
    description:
      "Spesialis dalam menangani gangguan mood dan kecemasan dengan pendekatan Cognitive Behavioral Therapy (CBT).",
    expertise: ["CBT", "Mindfulness", "Terapi Kelompok"],
    workingHours: "Senin-Jumat 09:00-17:00",
    languages: ["Indonesia", "English"],
  },
  {
    id: "2",
    name: "Psikolog Andi Pratama",
    title: "M.Psi",
    specialization: ["Burnout", "Stress Kerja"],
    experience: "8 tahun",
    rating: 4.8,
    price: "Rp 120.000",
    location: "Bandung",
    photo: "/placeholder.svg?height=150&width=150",
    isOnline: false,
    description: "Ahli dalam menangani burnout dan stress kerja dengan pengalaman di berbagai korporasi.",
    expertise: ["Work-Life Balance", "Stress Management", "Career Counseling"],
    workingHours: "Senin-Sabtu 08:00-16:00",
    languages: ["Indonesia"],
  },
  {
    id: "3",
    name: "Dr. Lisa Handayani",
    title: "Sp. Jiwa",
    specialization: ["Kecemasan", "Trauma"],
    experience: "15 tahun",
    rating: 4.9,
    price: "Rp 180.000",
    location: "Surabaya",
    photo: "/placeholder.svg?height=150&width=150",
    isOnline: true,
    description: "Spesialis trauma dan PTSD dengan sertifikasi EMDR dan terapi trauma lainnya.",
    expertise: ["EMDR", "Trauma Therapy", "PTSD Treatment"],
    workingHours: "Selasa-Sabtu 10:00-18:00",
    languages: ["Indonesia", "English"],
  },
  {
    id: "4",
    name: "Psikolog Maya Sari",
    title: "M.Psi",
    specialization: ["Kelelahan", "Self-Esteem"],
    experience: "6 tahun",
    rating: 4.7,
    price: "Rp 100.000",
    location: "Yogyakarta",
    photo: "/placeholder.svg?height=150&width=150",
    isOnline: true,
    description: "Fokus pada terapi untuk meningkatkan self-esteem dan mengatasi kelelahan mental.",
    expertise: ["Self-Compassion", "Acceptance Therapy", "Mindfulness"],
    workingHours: "Senin-Jumat 13:00-21:00",
    languages: ["Indonesia"],
  },
]

const specializations = ["Semua", "Depresi", "Kecemasan", "Burnout", "Kelelahan", "Trauma", "Stress Kerja"]

export default function DirektoriPsikologPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState<"login"|"register">("login")

  const [selectedSpecialization, setSelectedSpecialization] = useState("Semua")
  const [selectedPsychologist, setSelectedPsychologist] = useState<Psychologist | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")

  const filteredPsychologists = psychologists.filter((psych) => {
    return selectedSpecialization === "Semua" || psych.specialization.includes(selectedSpecialization)
  })

  const handleStartConsultation = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist)
    if (!isRegistered) {
      // Redirect to registration
      alert("Silakan daftar akun terlebih dahulu untuk melanjutkan konsultasi")
      return
    }
    setShowChat(true)
  }

  const handlePayment = () => {
    setShowPayment(true)
    // Simulate payment process
    setTimeout(() => {
      setPaymentCompleted(true)
      setShowPayment(false)
      // Initialize chat with system message
      setChatMessages([
        {
          id: "1",
          content: `Halo! Saya ${selectedPsychologist?.name}. Terima kasih telah memilih layanan konsultasi. Sesi berlangsung selama 60 menit. Apa yang ingin kita bahas hari ini?`,
          sender: "psychologist",
          timestamp: new Date(),
        },
      ])
    }, 3000)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate psychologist response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "Terima kasih sudah berbagi. Saya memahami perasaan yang Anda alami. Mari kita eksplorasi lebih dalam...",
        sender: "psychologist",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, response])
    }, 2000)
  }

  const handleBackToDirectory = () => {
    setShowChat(false)
    setSelectedPsychologist(null)
    setPaymentCompleted(false)
    setChatMessages([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-white/30 backdrop-blur-sm bg-white/90 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Heart className="h-8 w-8 text-indigo-500" />
                <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FriendYours
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/curhat" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Curhat
              </Link>
              <Link href="/jurnal-mood" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Jurnal Mood
              </Link>
              <Link href="/komunitas" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Komunitas
              </Link>
              <Link href="/tanya-psikolog" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Tanya Psikolog
              </Link>
              <Link href="/konten" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Konten
              </Link>
              <Link href="/pengaturan" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Pengaturan
              </Link>
              <Button 
                variant="outline" 
                className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsAuthOpen(true)}
              >
                <User className="h-4 w-4 mr-1" />
                Masuk
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Auth Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              {authType === "login" ? "Masuk ke Akun" : "Daftar Akun Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="col-span-3 border rounded-md px-3 py-2"
                placeholder="email@contoh.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="password" className="text-right">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="col-span-3 border rounded-md px-3 py-2"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setAuthType(authType === "login" ? "register" : "login")}
            >
              {authType === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              {authType === "login" ? "Masuk" : "Daftar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {showChat && selectedPsychologist ? (
          // Chat Interface
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" onClick={handleBackToDirectory}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <img
                    src={selectedPsychologist.photo || "/placeholder.svg"}
                    alt={selectedPsychologist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedPsychologist.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${selectedPsychologist.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      <span className="text-sm text-gray-500">
                        {selectedPsychologist.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Sesi: 60 menit</p>
                  <p className="text-sm font-medium text-green-600">Pembayaran: Lunas</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {!paymentCompleted ? (
                // Payment Interface
                <div className="p-8 text-center space-y-6">
                  {showPayment ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                      <p className="text-lg font-medium">Memproses Pembayaran...</p>
                      <p className="text-gray-600">Mohon tunggu sebentar</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Detail Konsultasi</h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Psikolog:</span>
                            <span className="font-medium">{selectedPsychologist.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Durasi:</span>
                            <span className="font-medium">60 menit</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Jadwal:</span>
                            <span className="font-medium">Sekarang</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">Total:</span>
                            <span className="font-semibold text-purple-600">{selectedPsychologist.price}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handlePayment}
                        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Bayar Sekarang
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                // Chat Messages
                <>
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                              : message.sender === "psychologist"
                                ? "bg-blue-100 text-blue-900"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}
                          >
                            {message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ketik pesan Anda..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ) : selectedPsychologist ? (
          // Psychologist Detail
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setSelectedPsychologist(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-2xl font-bold text-gray-800">Profil Psikolog</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedPsychologist.photo || "/placeholder.svg"}
                    alt={selectedPsychologist.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedPsychologist.name}</h3>
                    <p className="text-lg text-purple-600">{selectedPsychologist.title}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pengalaman</p>
                      <p className="font-medium">{selectedPsychologist.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{selectedPsychologist.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Harga Sesi</p>
                      <p className="font-medium text-green-600">{selectedPsychologist.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Lokasi</p>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{selectedPsychologist.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Status</p>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${selectedPsychologist.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                      />
                      <span
                        className={`font-medium ${selectedPsychologist.isOnline ? "text-green-600" : "text-gray-600"}`}
                      >
                        {selectedPsychologist.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Spesialisasi</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPsychologist.specialization.map((spec, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Keahlian</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPsychologist.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Jam Praktik</p>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{selectedPsychologist.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tentang</h4>
                <p className="text-gray-600 leading-relaxed">{selectedPsychologist.description}</p>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => handleStartConsultation(selectedPsychologist)}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Mulai Konsultasi
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Phone className="h-4 w-4 mr-2" />
                  Hubungi
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Directory List
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Direktori Psikolog</h2>
              <p className="text-gray-600">
                Temukan psikolog profesional yang tepat untuk kebutuhan kesehatan mental Anda
              </p>
            </div>

            {/* Filter Tabs */}
            <Tabs value={selectedSpecialization} onValueChange={setSelectedSpecialization} className="mb-8">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                {specializations.map((spec) => (
                  <TabsTrigger key={spec} value={spec} className="text-xs">
                    {spec}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Psychologist Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPsychologists.map((psychologist) => (
                <Card
                  key={psychologist.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <img
                          src={psychologist.photo || "/placeholder.svg"}
                          alt={psychologist.name}
                          className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                        <div
                          className={`absolute bottom-0 right-1/2 transform translate-x-6 w-6 h-6 rounded-full border-2 border-white ${
                            psychologist.isOnline ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-800">{psychologist.name}</h3>
                        <p className="text-purple-600 font-medium">{psychologist.title}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {psychologist.specialization.map((spec, index) => (
                            <Badge key={index} className="bg-purple-100 text-purple-800 text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Pengalaman</p>
                          <p className="font-medium">{psychologist.experience}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{psychologist.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{psychologist.price}</p>
                        <p className="text-sm text-gray-500">per sesi</p>
                      </div>

                      <Button
                        onClick={() => setSelectedPsychologist(psychologist)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        Lihat Profil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
