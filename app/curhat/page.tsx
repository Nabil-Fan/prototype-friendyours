"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Send, Bot, User, Play, ExternalLink, Calendar, Loader2, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { EmergencyModal } from "@/components/emergency-modal"

interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  emotion?: {
    emotion: string
    category: "positive" | "neutral" | "negative"
  }
  recommendations?: string[]
  voiceMotivation?: string
  externalLinks?: { title: string; url: string; type: "video" | "article" }[]
}

interface MoodOption {
  emoji: string
  label: string
  category: "positive" | "neutral" | "negative"
  color: string
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Senang", category: "positive", color: "from-green-400 to-emerald-500" },
  { emoji: "😌", label: "Tenang", category: "neutral", color: "from-blue-400 to-cyan-500" },
  { emoji: "😐", label: "Biasa aja", category: "neutral", color: "from-gray-400 to-slate-500" },
  { emoji: "😰", label: "Cemas", category: "negative", color: "from-yellow-400 to-orange-500" },
  { emoji: "😢", label: "Sedih", category: "negative", color: "from-blue-500 to-indigo-600" },
  { emoji: "😤", label: "Kesal", category: "negative", color: "from-red-400 to-pink-500" },
]

type ChatbotState = "greeting" | "chatting"

export default function CurhatPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState<"login"|"register">("login")

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "Hai! Aku di sini untuk mendengarkan ceritamu. Gimana kabarmu hari ini?",
      timestamp: new Date(),
    },
  ])
  const [currentState, setCurrentState] = useState<ChatbotState>("greeting")
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (type: "user" | "ai", content: string, additionalData?: Partial<ChatMessage>) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      ...additionalData,
    }
    setMessages((prev) => [...prev, newMessage])

    // Update conversation history for AI context
    setConversationHistory((prev) => [...prev, { role: type === "user" ? "user" : "assistant", content }])
  }

  const sendMessageToAI = async (message: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      // Check for emergency
      if (data.crisis?.isEmergency) {
        setShowEmergencyModal(true)
      }

      // Add AI response with all the data
      addMessage("ai", data.response, {
        emotion: data.emotion,
        recommendations: data.recommendations?.length > 0 ? data.recommendations : undefined,
        voiceMotivation: data.voiceMotivation || undefined,
        externalLinks: data.externalLinks?.length > 0 ? data.externalLinks : undefined,
      })

      setCurrentState("chatting")
    } catch (error) {
      console.error("Error calling chat API:", error)
      addMessage("ai", "Maaf, ada gangguan koneksi sebentar. Tapi aku tetap di sini untukmu. Coba kirim pesan lagi ya?")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoodSelection = async (mood: string) => {
    addMessage("user", `Aku merasa ${mood} hari ini`)
    await sendMessageToAI(`Aku merasa ${mood} hari ini`)
  }

  const handleMessageSubmit = async () => {
    if (!userInput.trim()) return

    const message = userInput
    addMessage("user", message)
    setUserInput("")

    await sendMessageToAI(message)
  }

  const playVoiceMotivation = (text: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "id-ID"
      utterance.rate = 0.8
      utterance.pitch = 1.0
      utterance.volume = 0.9

      // Try to find Indonesian voice
      const voices = speechSynthesis.getVoices()
      const indonesianVoice = voices.find(
        (voice) =>
          voice.lang.includes("id") ||
          voice.name.toLowerCase().includes("indonesia") ||
          voice.name.toLowerCase().includes("bahasa"),
      )

      if (indonesianVoice) {
        utterance.voice = indonesianVoice
      }

      speechSynthesis.speak(utterance)
    } else {
      alert("Browser tidak mendukung text-to-speech")
    }
  }

  const getEmotionColor = (category: string) => {
    switch (category) {
      case "positive":
        return "text-green-700 bg-gradient-to-r from-green-100 to-emerald-100"
      case "negative":
        return "text-red-700 bg-gradient-to-r from-red-100 to-pink-100"
      default:
        return "text-blue-700 bg-gradient-to-r from-blue-100 to-cyan-100"
    }
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center space-x-2">
              <Bot className="h-8 w-8 text-indigo-600" />
              <span>Chat dengan Sahabat AI</span>
            </CardTitle>
            <p className="text-gray-600">AI yang siap mendengarkan dan memahami ceritamu</p>
          </CardHeader>
          <CardContent>
            {/* Chat Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                        : "bg-white shadow-md text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.type === "ai" && <Bot className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />}
                      {msg.type === "user" && <User className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{msg.content}</p>

                        {/* Emotion Display */}
                        {msg.emotion && msg.type === "ai" && (
                          <div className="mt-2">
                            <Badge className={`text-xs ${getEmotionColor(msg.emotion.category)}`}>
                              {msg.emotion.emotion}
                            </Badge>
                          </div>
                        )}

                        {/* Recommendations */}
                        {msg.recommendations && msg.recommendations.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="font-semibold text-indigo-700 text-xs">Saran praktis:</p>
                            <ul className="space-y-1 text-xs">
                              {msg.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-indigo-500">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Voice Motivation */}
                        {msg.voiceMotivation && (
                          <div className="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs text-indigo-700 font-medium">Motivasi</p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => playVoiceMotivation(msg.voiceMotivation!)}
                                className="h-8 px-3 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Dengar
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 italic">"{msg.voiceMotivation}"</p>
                          </div>
                        )}

                        {/* External Links */}
                        {msg.externalLinks && msg.externalLinks.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="font-semibold text-indigo-700 text-xs">Konten yang membantu:</p>
                            {msg.externalLinks.map((link, index) => (
                              <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>{link.title}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-md rounded-2xl px-4 py-3 max-w-xs border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-indigo-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                      <span className="text-sm text-gray-600">Sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              {/* Mood Selection for first interaction */}
              {currentState === "greeting" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 font-medium text-center">Atau pilih mood kamu:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood.label}
                        variant="outline"
                        onClick={() => handleMoodSelection(mood.label)}
                        disabled={isLoading}
                        className={`h-auto p-3 flex flex-col items-center space-y-1 bg-gradient-to-r ${mood.color} text-white border-0 hover:scale-105 transition-all duration-300 shadow-lg`}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                        <span className="text-xs font-medium">{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="space-y-4">
                <Textarea
                  placeholder="Ketik pesan kamu di sini..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isLoading}
                  className="min-h-[100px] resize-none border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      if (userInput.trim() && !isLoading) {
                        handleMessageSubmit()
                      }
                    }
                  }}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Enter untuk kirim, Shift+Enter untuk baris baru</p>
                  <Button
                    onClick={handleMessageSubmit}
                    disabled={!userInput.trim() || isLoading}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    Kirim
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              {currentState === "chatting" && (
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <Link href="/jurnal-mood">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:from-blue-100 hover:to-cyan-100"
                    >
                      <Calendar className="h-6 w-6 text-blue-600" />
                      <span className="font-medium text-blue-800">Mood Tracking</span>
                      <span className="text-xs text-blue-600">Pantau perkembangan mood</span>
                    </Button>
                  </Link>
                  <Link href="/komunitas">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 hover:from-purple-100 hover:to-indigo-100"
                    >
                      <Heart className="h-6 w-6 text-purple-600" />
                      <span className="font-medium text-purple-800">Komunitas</span>
                      <span className="text-xs text-purple-600">Berbagi dengan sesama</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <EmergencyModal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} />
    </div>
  )
}
