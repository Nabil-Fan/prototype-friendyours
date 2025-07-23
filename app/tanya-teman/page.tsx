"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Send, MessageCircle, ThumbsUp, Users, Clock, CheckCircle, Search, Sparkle, ArrowLeft, Bot, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  timestamp: Date;
}

const allQuestions: Question[] = [
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
    timestamp: new Date(Date.now() - 3 * 3600 * 1000),
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
    timestamp: new Date(Date.now() - 5 * 3600 * 1000),
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
    timestamp: new Date(Date.now() - 24 * 3600 * 1000),
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
    category: "Hubungan & Sosial",
    isResolved: false,
    timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000),
  },
  {
    id: "5",
    title: "Belajar agama di tengah kesibukan kerja?",
    content: "Saya muslim dan ingin lebih mendalami agama, tapi kerjaan bikin saya capek banget. Ada tips untuk membagi waktu?",
    author: "Anonim",
    timeAgo: "10 jam lalu",
    responses: 7,
    supports: 9,
    category: "Perspektif Islam",
    isResolved: false,
    timestamp: new Date(Date.now() - 10 * 3600 * 1000),
  },
  {
    id: "6",
    title: "Anxiety muncul tiap mau tidur, gimana ngatasinnya?",
    content: "Tiap mau tidur pikiran jadi kemana-mana, cemas sendiri. Kadang sampai keringat dingin. Ini kenapa ya?",
    author: "Anonim",
    timeAgo: "1 jam lalu",
    responses: 30,
    supports: 45,
    category: "Kecemasan",
    isResolved: false,
    timestamp: new Date(Date.now() - 1 * 3600 * 1000),
  },
  {
    id: "7",
    title: "Tekanan kerja di startup bikin overthinking, ada yang sama?",
    content: "Kerja di startup bikin saya harus gerak cepat dan mikir banyak, kadang sampai kebawa ke rumah. Rasanya tertekan banget.",
    author: "Anonim",
    timeAgo: "4 hari lalu",
    responses: 18,
    supports: 28,
    category: "Tekanan Kerja",
    isResolved: false,
    timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000),
  },
];

const categories = [
  "Semua Kategori",
  "Keluarga",
  "Kesehatan Mental",
  "Karir",
  "Hubungan & Sosial",
  "Perspektif Islam",
  "Kecemasan",
  "Tekanan Kerja",
];

export default function TanyaTemanPage() {
  const [newQuestionContent, setNewQuestionContent] = useState("")
  const [newQuestionTitle, setNewQuestionTitle] = useState("")
  const [newQuestionCategory, setNewQuestionCategory] = useState(categories[1])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("Semua Kategori")
  const [feedType, setFeedType] = useState<"terbaru" | "populer">("terbaru")

  const router = useRouter();

  const [isTanyaDropdownOpen, setIsTanyaDropdownOpen] = useState(false);

  const handleSubmitQuestion = async () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return

    setIsSubmitting(true)

    setTimeout(() => {
      const addedQuestion: Question = {
        id: (allQuestions.length + 1).toString(),
        title: newQuestionTitle,
        content: newQuestionContent,
        author: "Anonim",
        timeAgo: "Baru saja",
        responses: 0,
        supports: 0,
        category: newQuestionCategory,
        isResolved: false,
        timestamp: new Date(),
      };
      allQuestions.unshift(addedQuestion);

      setIsSubmitting(false)
      setNewQuestionTitle("")
      setNewQuestionContent("")
      setNewQuestionCategory(categories[1])
      setShowForm(false)
      alert("Pertanyaan berhasil diajukan! (Simulasi)")
    }, 1500)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Keluarga: "bg-blue-100 text-blue-800",
      "Kesehatan Mental": "bg-purple-100 text-purple-800",
      Karir: "bg-green-100 text-green-800",
      Hubungan: "bg-pink-100 text-pink-800",
      "Hubungan & Sosial": "bg-pink-100 text-pink-800",
      Akademik: "bg-orange-100 text-orange-800",
      "Perspektif Islam": "bg-emerald-100 text-emerald-800",
      Kecemasan: "bg-red-100 text-red-800",
      "Tekanan Kerja": "bg-yellow-100 text-yellow-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const filteredAndSortedQuestions = useMemo(() => {
    let filtered = [...allQuestions];

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.title.toLowerCase().includes(lowerCaseQuery) ||
          q.content.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedCategoryTab !== "Semua Kategori") {
      filtered = filtered.filter((q) => q.category === selectedCategoryTab);
    }

    if (feedType === "terbaru") {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else {
      filtered.sort((a, b) => {
        const scoreA = a.supports * 2 + a.responses;
        const scoreB = b.supports * 2 + b.responses;
        return scoreB - scoreA;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategoryTab, feedType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Bagian ini adalah div fleksibel untuk menampung tombol kembali dan logo */}
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
              <Link href="/curhat" className="text-gray-600 hover:text-gray-800 transition-colors">
                Curhat
              </Link>
              <Link href="/tracking" className="text-gray-600 hover:text-gray-800 transition-colors">
                Mood Tracking
              </Link>

              <div className="relative">
                <button
                  onClick={() => setIsTanyaDropdownOpen(!isTanyaDropdownOpen)}
                  className="text-purple-600 font-semibold transition-colors focus:outline-none flex items-center" // Menandai Tanya Teman sebagai aktif
                >
                  Tanya <span className="ml-1 text-sm">&#9662;</span> {/* Down arrow */}
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mode Tanya Teman</h2>
          <p className="text-gray-600">Ajukan pertanyaan dan dapatkan perspektif dari komunitas yang peduli</p>
        </div>

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
                <label htmlFor="question-title" className="block text-sm font-medium text-gray-700 mb-2">Judul Pertanyaan</label>
                <Input
                  id="question-title"
                  placeholder="Tulis judul pertanyaan yang jelas dan spesifik..."
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div>
                <label htmlFor="question-content" className="block text-sm font-medium text-gray-700 mb-2">Detail Pertanyaan</label>
                <Textarea
                  id="question-content"
                  placeholder="Ceritakan situasimu dengan detail. Semakin jelas, semakin baik komunitas bisa membantu..."
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div>
                <label htmlFor="question-category" className="block text-sm font-medium text-gray-700 mb-2">Pilih Topik/Kategori</label>
                <Select
                  value={newQuestionCategory}
                  onValueChange={setNewQuestionCategory}
                >
                  <SelectTrigger className="w-full border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "Semua Kategori").map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    disabled={!newQuestionTitle.trim() || !newQuestionContent.trim() || isSubmitting}
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

        <div className="mb-6">
          <div className="relative mb-4">
            <Input
              placeholder="Cari pertanyaan atau topik..."
              className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-purple-400 focus:ring-purple-400 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-4 mb-4">
            <Button
              variant={feedType === "terbaru" ? "default" : "outline"}
              onClick={() => setFeedType("terbaru")}
              className={feedType === "terbaru" ? "bg-purple-600 hover:bg-purple-700 text-white" : "border-purple-300 text-purple-600 hover:bg-purple-50"}
            >
              <Clock className="h-4 w-4 mr-2" /> Terbaru
            </Button>
            <Button
              variant={feedType === "populer" ? "default" : "outline"}
              onClick={() => setFeedType("populer")}
              className={feedType === "populer" ? "bg-purple-600 hover:bg-purple-700 text-white" : "border-purple-300 text-purple-600 hover:bg-purple-50"}
            >
              <Sparkle className="h-4 w-4 mr-2" /> Populer
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategoryTab === category ? "default" : "secondary"}
                onClick={() => setSelectedCategoryTab(category)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategoryTab === category
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {feedType === "terbaru" ? "Post Terbaru" : "Post Populer"}
          </h3>

          {filteredAndSortedQuestions.length === 0 && (
            <p className="text-gray-500 text-center py-8">Tidak ada pertanyaan yang cocok dengan kriteria Anda.</p>
          )}

          {filteredAndSortedQuestions.map((question) => (
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

        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Panduan Mode Tanya Teman</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Saat Mengajukan Pertanyaan:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Buat judul yang jelas dan spesifik</li>
                  <li>• Berikan konteks yang cukup agar mudah dipahami</li>
                  <li>• Hormati privasi diri dan orang lain (pertanyaanmu anonim)</li>
                  <li>• Gunakan bahasa yang sopan dan membangun</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Saat Memberikan Jawaban:</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• Berikan respons yang konstruktif dan relevan</li>
                  <li>• Hindari menghakimi atau menyalahkan</li>
                  <li>• Bagikan pengalaman dengan bijak dan tanpa menggurui</li>
                  <li>• Dukung dengan empati dan pengertian</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}