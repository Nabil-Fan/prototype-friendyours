"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, Send, Bot, User, Play, ExternalLink, Calendar, Loader2, Book, Settings, ArrowLeft } from "lucide-react" // Pastikan semua icon sudah diimpor
import Link from "next/link"
import { EmergencyModal } from "@/components/emergency-modal"
import { useRouter } from "next/navigation"

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
}

const moodOptions: MoodOption[] = [
  { emoji: "😊", label: "Senang", category: "positive" },
  { emoji: "😌", label: "Tenang", category: "neutral" },
  { emoji: "😐", label: "Biasa aja", category: "neutral" },
  { emoji: "😰", label: "Cemas", category: "negative" },
  { emoji: "😢", label: "Sedih", category: "negative" },
  { emoji: "😤", label: "Kesal", category: "negative" },
]

type ChatbotState = "greeting" | "chatting"

export default function CurhatPage() {
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

  // State untuk kontrol dropdown "Tanya"
  const [isTanyaDropdownOpen, setIsTanyaDropdownOpen] = useState(false);


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

      // Coba Indonesian voice
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
        return "text-green-600 bg-green-100"
      case "negative":
        return "text-red-600 bg-red-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-pink-500" />
                <h1 className="text-2xl font-bold text-gray-800">FriendYours</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-2 md:hidden">
              <Bot className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-700">Sahabat AI</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/curhat" className="text-purple-600 font-semibold transition-colors">
                Curhat
              </Link>
              <Link href="/tracking" className="text-gray-600 hover:text-gray-800 transition-colors">
                Mood Tracking
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsTanyaDropdownOpen(!isTanyaDropdownOpen)}
                  className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none flex items-center"
                >
                  Tanya <span className="ml-1 text-sm">&#9662;</span>
                </button>

                {isTanyaDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/tanya-komunitas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsTanyaDropdownOpen(false)}>
                      Tanya Komunitas
                    </Link>
                    <Link href="/tanya-teman" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsTanyaDropdownOpen(false)}>
                      Tanya Teman
                    </Link>
                    <Link href="/tanya-psikolog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsTanyaDropdownOpen(false)}>
                      Tanya Psikolog
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/Konten" className="text-gray-600 hover:text-gray-800 transition-colors">
                Konten
              </Link>

              <Link href="/settings" className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-1">
                <Settings className="h-5 w-5" />
              </Link>
            </nav>
            <div className="md:hidden">
              <Link href="/settings">
                <Settings className="h-6 w-6 text-gray-600 hover:text-gray-800" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center space-x-2">
              <Bot className="h-8 w-8 text-purple-600" />
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
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        : "bg-white shadow-md text-gray-800"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.type === "ai" && <Bot className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />}
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
                            <p className="font-semibold text-purple-700 text-xs">Saran praktis:</p>
                            <ul className="space-y-1 text-xs">
                              {msg.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-purple-500">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {msg.voiceMotivation && (
                          <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-xs text-purple-700 font-medium">Motivasi</p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => playVoiceMotivation(msg.voiceMotivation!)}
                                className="h-8 px-3 text-purple-600 border-purple-200 hover:bg-purple-100"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Dengar
                              </Button>
                            </div>
                            <p className="text-xs text-gray-600 italic">"{msg.voiceMotivation}"</p>
                          </div>
                        )}

                        {msg.externalLinks && msg.externalLinks.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="font-semibold text-purple-700 text-xs">Konten yang membantu:</p>
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
                  <div className="bg-white shadow-md rounded-2xl px-4 py-3 max-w-xs">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-purple-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-sm text-gray-600">Sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="space-y-4">
              {currentState === "greeting" && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 font-medium">Atau pilih mood kamu:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood.label}
                        variant="outline"
                        onClick={() => handleMoodSelection(mood.label)}
                        disabled={isLoading}
                        className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                          mood.category === "positive"
                            ? "border-green-200 hover:bg-green-50"
                            : mood.category === "neutral"
                              ? "border-blue-200 hover:bg-blue-50"
                              : "border-red-200 hover:bg-red-50"
                        }`}
                      >
                        <span className="text-2xl">{mood.emoji}</span>
                        <span className="text-xs">{mood.label}</span>
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
                  className="min-h-[100px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
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
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    Kirim
                  </Button>
                </div>
              </div>

              {/* Quick Actions - "Sumber Daya" is already added here */}
              {currentState === "chatting" && (
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                  <Link href="/tracking">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <Calendar className="h-6 w-6 text-purple-600" />
                      <span className="font-medium">Mood Tracking</span>
                      <span className="text-xs text-gray-500">Pantau perkembangan mood</span>
                    </Button>
                  </Link>
                  <Link href="/komunitas">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <Heart className="h-6 w-6 text-pink-600" />
                      <span className="font-medium">Komunitas</span>
                      <span className="text-xs text-gray-500">Berbagi dengan sesama</span>
                    </Button>
                  </Link>
                  <Link href="/resources"> {/* This is the "Sumber Daya" Quick Action Button */}
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <Book className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Sumber Daya</span>
                      <span className="text-xs text-gray-500">Baca artikel & panduan</span>
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
  );
}