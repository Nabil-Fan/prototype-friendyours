"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  BookOpen,
  Video,
  Headphones,
  Wind,
  Star,
  Search,
  Filter,
  Play,
  ExternalLink,
  Clock,
  User,
  Sparkles
} from "lucide-react"
import Link from "next/link"

interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  author: string
  rating: number
  image: string
}

interface VideoContent {
  id: string
  title: string
  description: string
  category: string
  duration: string
  thumbnail: string
  url: string
  views: string
}

interface AudioContent {
  id: string
  title: string
  description: string
  category: string
  duration: string
  url: string
  plays: string
}

const articles: Article[] = [
  {
    id: "1",
    title: "Mengatasi Anxiety dengan Teknik Grounding 5-4-3-2-1",
    excerpt:
      "Teknik sederhana namun efektif untuk mengatasi serangan panik dan kecemasan berlebihan dalam situasi apapun.",
    category: "Kecemasan",
    readTime: "5 menit",
    author: "Dr. Sarah Wijaya",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Burnout vs Kelelahan Biasa: Kenali Perbedaannya",
    excerpt: "Memahami tanda-tanda burnout dan cara membedakannya dengan kelelahan normal untuk penanganan yang tepat.",
    category: "Burnout",
    readTime: "7 menit",
    author: "Psikolog Andi Pratama",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Doa dan Dzikir untuk Ketenangan Hati",
    excerpt: "Kumpulan doa dan dzikir yang dapat membantu menenangkan pikiran dan hati dalam menghadapi cobaan hidup.",
    category: "Pencerahan Islami",
    readTime: "4 menit",
    author: "Ustadz Muhammad Ridwan",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Self-Care Routine untuk Kesehatan Mental",
    excerpt:
      "Panduan praktis membangun rutinitas self-care yang sustainable untuk menjaga kesehatan mental sehari-hari.",
    category: "Tips Koping",
    readTime: "6 menit",
    author: "Dr. Lisa Handayani",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
  },
]

const videos: VideoContent[] = [
  {
    id: "1",
    title: "Meditasi Mindfulness 10 Menit untuk Pemula",
    description: "Panduan meditasi mindfulness yang mudah diikuti untuk mengurangi stress dan meningkatkan fokus.",
    category: "Meditasi",
    duration: "10:30",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://youtube.com/watch?v=example1",
    views: "125K",
  },
  {
    id: "2",
    title: "Motivasi Pagi: Bangkit dari Keterpurukan",
    description:
      "Video motivasi untuk memulai hari dengan semangat dan mindset positif meski sedang menghadapi masalah.",
    category: "Motivasi",
    duration: "8:45",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://youtube.com/watch?v=example2",
    views: "89K",
  },
  {
    id: "3",
    title: "Latihan Pernapasan untuk Mengatasi Panik",
    description: "Teknik pernapasan yang terbukti efektif untuk menenangkan diri saat mengalami serangan panik.",
    category: "Latihan Pernapasan",
    duration: "12:15",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://youtube.com/watch?v=example3",
    views: "67K",
  },
  {
    id: "4",
    title: "Ceramah: Sabar dalam Menghadapi Ujian Hidup",
    description: "Kajian tentang makna sabar dalam Islam dan bagaimana mengaplikasikannya dalam kehidupan sehari-hari.",
    category: "Pencerahan Islami",
    duration: "25:30",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://youtube.com/watch?v=example4",
    views: "156K",
  },
]

const podcasts: AudioContent[] = [
  {
    id: "1",
    title: "Mental Health Talk: Menormalkan Therapy",
    description:
      "Diskusi mendalam tentang pentingnya terapi dan menghilangkan stigma negatif terhadap kesehatan mental.",
    category: "Podcast",
    duration: "45:20",
    url: "https://spotify.com/episode/example1",
    plays: "23K",
  },
  {
    id: "2",
    title: "Suara Alam untuk Relaksasi",
    description: "Kumpulan suara alam yang menenangkan untuk membantu tidur, meditasi, atau sekedar relaksasi.",
    category: "Relaksasi",
    duration: "60:00",
    url: "https://spotify.com/episode/example2",
    plays: "45K",
  },
  {
    id: "3",
    title: "Murottal Al-Quran untuk Ketenangan",
    description: "Lantunan ayat suci Al-Quran dengan suara merdu untuk menenangkan hati dan pikiran.",
    category: "Pencerahan Islami",
    duration: "30:15",
    url: "https://spotify.com/episode/example3",
    plays: "78K",
  },
]

const categories = [
  "Semua",
  "Kecemasan",
  "Burnout",
  "Tips Koping",
  "Pencerahan Islami",
  "Meditasi",
  "Motivasi",
  "Latihan Pernapasan",
]

export default function SumberDayaPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState<"login"|"register">("login")

  const [activeTab, setActiveTab] = useState("artikel")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const filteredArticles = articles.filter((article) => {
    const categoryMatch = selectedCategory === "Semua" || article.category === selectedCategory
    const searchMatch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  const filteredVideos = videos.filter((video) => {
    const categoryMatch = selectedCategory === "Semua" || video.category === selectedCategory
    const searchMatch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  const filteredPodcasts = podcasts.filter((podcast) => {
    const categoryMatch = selectedCategory === "Semua" || podcast.category === selectedCategory
    const searchMatch =
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Konten</h2>
          <p className="text-gray-600">
            Kumpulan artikel, video, podcast, dan konten edukatif untuk mendukung kesehatan mental
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari artikel, video, podcast..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Article Detail Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-800">{selectedArticle.category}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(null)}>
                    ✕
                  </Button>
                </div>
                <CardTitle className="text-2xl">{selectedArticle.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{selectedArticle.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <img
                  src={selectedArticle.image || "/placeholder.svg"}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedArticle.excerpt}</p>

                  {/* Mock article content */}
                  <div className="space-y-4 text-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800">Pengenalan</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-800">Langkah-langkah Praktis</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Identifikasi 5 hal yang bisa kamu lihat di sekitarmu</li>
                      <li>Sebutkan 4 hal yang bisa kamu sentuh</li>
                      <li>Dengarkan 3 suara yang ada di sekitarmu</li>
                      <li>Cium 2 aroma yang bisa kamu rasakan</li>
                      <li>Rasakan 1 rasa di mulutmu</li>
                    </ol>

                    <h3 className="text-xl font-semibold text-gray-800">Kesimpulan</h3>
                    <p>
                      Teknik grounding ini sangat efektif untuk mengembalikan fokus ke masa kini dan mengurangi
                      kecemasan. Praktikkan secara rutin untuk hasil yang optimal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="artikel" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Artikel</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="podcast" className="flex items-center space-x-2">
              <Headphones className="h-4 w-4" />
              <span>Podcast</span>
            </TabsTrigger>
            <TabsTrigger value="latihan" className="flex items-center space-x-2">
              <Wind className="h-4 w-4" />
              <span>Latihan</span>
            </TabsTrigger>
          </TabsList>

          {/* Artikel */}
          <TabsContent value="artikel" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-purple-100 text-purple-800">{article.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{article.rating}</span>
                        </div>
                      </div>
                      <span>{article.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Video */}
          <TabsContent value="video" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg group">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-white/90 text-gray-800 hover:bg-white rounded-full w-16 h-16"
                        onClick={() => window.open(video.url, "_blank")}
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-purple-100 text-purple-800">{video.category}</Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.views} views</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(video.url, "_blank")}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Tonton
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Podcast */}
          <TabsContent value="podcast" className="space-y-6">
            <div className="space-y-4">
              {filteredPodcasts.map((podcast) => (
                <Card
                  key={podcast.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Headphones className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className="bg-purple-100 text-purple-800">{podcast.category}</Badge>
                          <Badge className="bg-gray-100 text-gray-800">{podcast.duration}</Badge>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{podcast.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{podcast.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{podcast.plays} plays</span>
                          <Button
                            size="sm"
                            onClick={() => window.open(podcast.url, "_blank")}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Dengar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Latihan Pernapasan */}
          <TabsContent value="latihan" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wind className="h-6 w-6 text-blue-500" />
                    <span>Latihan 4-7-8</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Teknik pernapasan untuk mengurangi kecemasan dan membantu tidur.</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>1.</strong> Tarik napas selama 4 hitungan
                    </p>
                    <p>
                      <strong>2.</strong> Tahan napas selama 7 hitungan
                    </p>
                    <p>
                      <strong>3.</strong> Buang napas selama 8 hitungan
                    </p>
                    <p>
                      <strong>4.</strong> Ulangi 3-4 kali
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Play className="h-4 w-4 mr-2" />
                    Mulai Latihan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wind className="h-6 w-6 text-green-500" />
                    <span>Box Breathing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Teknik pernapasan untuk meningkatkan fokus dan ketenangan.</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>1.</strong> Tarik napas selama 4 hitungan
                    </p>
                    <p>
                      <strong>2.</strong> Tahan napas selama 4 hitungan
                    </p>
                    <p>
                      <strong>3.</strong> Buang napas selama 4 hitungan
                    </p>
                    <p>
                      <strong>4.</strong> Tahan kosong selama 4 hitungan
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                    <Play className="h-4 w-4 mr-2" />
                    Mulai Latihan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wind className="h-6 w-6 text-purple-500" />
                    <span>Belly Breathing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Pernapasan perut untuk relaksasi mendalam dan mengurangi stress.</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>1.</strong> Letakkan tangan di dada dan perut
                    </p>
                    <p>
                      <strong>2.</strong> Tarik napas perlahan melalui hidung
                    </p>
                    <p>
                      <strong>3.</strong> Rasakan perut mengembang
                    </p>
                    <p>
                      <strong>4.</strong> Buang napas perlahan melalui mulut
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <Play className="h-4 w-4 mr-2" />
                    Mulai Latihan
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wind className="h-6 w-6 text-orange-500" />
                    <span>Alternate Nostril</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Teknik yoga untuk menyeimbangkan energi dan menenangkan pikiran.</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>1.</strong> Tutup lubang hidung kanan dengan ibu jari
                    </p>
                    <p>
                      <strong>2.</strong> Tarik napas melalui lubang hidung kiri
                    </p>
                    <p>
                      <strong>3.</strong> Tutup kiri, buka kanan, buang napas
                    </p>
                    <p>
                      <strong>4.</strong> Ulangi bergantian
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                    <Play className="h-4 w-4 mr-2" />
                    Mulai Latihan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
