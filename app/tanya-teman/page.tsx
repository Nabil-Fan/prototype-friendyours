"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Send, MessageCircle, ThumbsUp, Users, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Question {
  id: string
  title: string
  content: string
  author: string
  timeAgo: string
  responses: number
  supports: number
  category: string
  isResolved: boolean
}

const existingQuestions: Question[] = [
  {
    id: "1",
    title: "Gimana cara ngomong ke orang tua kalau mau ganti jurusan?",
    content:
      "Aku udah semester 4 tapi ngerasa salah jurusan. Passion aku bukan di sini, tapi takut banget ngomong ke ortu karena mereka udah invest banyak...",
    author: "Anonim",
    timeAgo: "3 jam lalu",
    responses: 8,
    supports: 12,
    category: "Keluarga",
    isResolved: false,
  },
  {
    id: "2",
    title: "Cara mengatasi social anxiety saat presentasi?",
    content:
      "Setiap kali harus presentasi di depan kelas atau meeting, aku selalu nervous banget. Tangan gemetar, suara bergetar, pikiran blank. Ada tips praktis?",
    author: "Anonim",
    timeAgo: "5 jam lalu",
    responses: 15,
    supports: 23,
    category: "Kesehatan Mental",
    isResolved: true,
  },
  {
    id: "3",
    title: "Susah banget cari kerja setelah lulus, normal gak sih?",
    content:
      "Udah 6 bulan lulus tapi belum dapet kerja. Temen-temen udah pada kerja, aku jadi insecure. Apakah ini normal atau ada yang salah dengan aku?",
    author: "Anonim",
    timeAgo: "1 hari lalu",
    responses: 22,
    supports: 31,
    category: "Karir",
    isResolved: false,
  },
  {
    id: "4",
    title: "Cara maintain friendship yang sehat di masa dewasa?",
    content:
      "Setelah kerja, susah banget maintain pertemanan. Temen-temen pada sibuk, jarang ketemu. Gimana cara keep in touch tanpa terkesan maksa?",
    author: "Anonim",
    timeAgo: "2 hari lalu",
    responses: 11,
    supports: 18,
    category: "Hubungan",
    isResolved: false,
  },
]

export default function TanyaTemanPage() {
  const [newQuestion, setNewQuestion] = useState("")
  const [questionTitle, setQuestionTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmitQuestion = async () => {
    if (!questionTitle.trim() || !newQuestion.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setQuestionTitle("")
      setNewQuestion("")
      setShowForm(false)
      // Here you would typically add the new question to the list
    }, 2000)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Keluarga: "bg-blue-100 text-blue-800",
      "Kesehatan Mental": "bg-purple-100 text-purple-800",
      Karir: "bg-green-100 text-green-800",
      Hubungan: "bg-pink-100 text-pink-800",
      Akademik: "bg-orange-100 text-orange-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold text-gray-800">FriendYours</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/curhat" className="text-gray-600 hover:text-gray-800 transition-colors">
                Curhat
              </Link>
              <Link href="/tracking" className="text-gray-600 hover:text-gray-800 transition-colors">
                Mood Tracking
              </Link>
              <Link href="/komunitas" className="text-gray-600 hover:text-gray-800 transition-colors">
                Komunitas
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mode Tanya Teman</h2>
          <p className="text-gray-600">Ajukan pertanyaan dan dapatkan perspektif dari komunitas yang peduli</p>
        </div>

        {/* Ask Question Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Punya Pertanyaan?</span>
              {!showForm && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ajukan Pertanyaan
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          {showForm && (
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pertanyaan</label>
                <Input
                  placeholder="Tulis judul pertanyaan yang jelas dan spesifik..."
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detail Pertanyaan</label>
                <Textarea
                  placeholder="Ceritakan situasimu dengan detail. Semakin jelas, semakin baik komunitas bisa membantu..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Pertanyaanmu akan ditampilkan secara anonim untuk menjaga privasi
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowForm(false)} disabled={isSubmitting}>
                    Batal
                  </Button>
                  <Button
                    onClick={handleSubmitQuestion}
                    disabled={!questionTitle.trim() || !newQuestion.trim() || isSubmitting}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Tanyakan ke Komunitas
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-10 w-10 text-blue-500 mx-auto mb-3" />
              <div className="text-xl font-bold text-gray-800 mb-1">847</div>
              <p className="text-gray-600 text-sm">Pertanyaan Aktif</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <div className="text-xl font-bold text-gray-800 mb-1">2,341</div>
              <p className="text-gray-600 text-sm">Respons Diberikan</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-10 w-10 text-purple-500 mx-auto mb-3" />
              <div className="text-xl font-bold text-gray-800 mb-1">623</div>
              <p className="text-gray-600 text-sm">Masalah Terselesaikan</p>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Pertanyaan dari Komunitas</h3>

          {existingQuestions.map((question) => (
            <Card
              key={question.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 cursor-pointer">
                        {question.title}
                      </h3>
                      {question.isResolved && (
                        <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Terselesaikan</span>
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>oleh {question.author}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{question.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(question.category)}>{question.category}</Badge>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{question.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{question.responses} respons</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{question.supports} dukungan</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Aku pernah merasakan juga
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Bantu Jawab
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guidelines */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Panduan Komunitas</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Saat Bertanya:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Buat judul yang jelas dan spesifik</li>
                  <li>• Berikan konteks yang cukup</li>
                  <li>• Hormati privasi diri dan orang lain</li>
                  <li>• Gunakan bahasa yang sopan</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Saat Menjawab:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Berikan respons yang konstruktif</li>
                  <li>• Hindari menghakimi atau menyalahkan</li>
                  <li>• Bagikan pengalaman dengan bijak</li>
                  <li>• Dukung dengan empati</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
