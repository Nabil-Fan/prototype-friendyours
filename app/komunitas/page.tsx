"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, ThumbsUp, MapPin, Users, Clock, Eye } from "lucide-react"
import Link from "next/link"

interface CommunityPost {
  id: string
  title: string
  content: string
  location: string
  university?: string
  replies: number
  upvotes: number
  timeAgo: string
  category: "academic" | "work" | "relationship" | "mental-health" | "general"
}

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    title: "Stress menghadapi skripsi semester akhir",
    content:
      "Halo teman-teman, aku lagi stress banget nih ngerjain skripsi. Dosen pembimbing susah ditemui, data penelitian masih kurang, deadline makin deket. Ada yang pernah ngalamin hal serupa? Gimana cara kalian cope with stress ini?",
    location: "Solo",
    university: "UNS",
    replies: 12,
    upvotes: 8,
    timeAgo: "2 jam lalu",
    category: "academic",
  },
  {
    id: "2",
    title: "Burnout kerja di startup, butuh saran",
    content:
      "Udah 6 bulan kerja di startup, workload crazy banget. Sering lembur sampai malem, weekend juga kadang masuk. Mulai ngerasa burnout tapi takut resign karena ekonomi belum stabil...",
    location: "Jakarta",
    replies: 18,
    upvotes: 15,
    timeAgo: "4 jam lalu",
    category: "work",
  },
  {
    id: "3",
    title: "Putus dengan pacar lama, gimana move on?",
    content:
      "Baru aja putus sama pacar 3 tahun. Rasanya kosong banget, susah fokus kuliah. Temen-temen bilang harus move on tapi kok susah ya. Ada tips dari kalian yang pernah ngalamin?",
    location: "Bandung",
    university: "ITB",
    replies: 25,
    upvotes: 22,
    timeAgo: "6 jam lalu",
    category: "relationship",
  },
  {
    id: "4",
    title: "Anxiety disorder, takut ke psikolog",
    content:
      "Aku udah lama ngerasa cemas berlebihan, susah tidur, jantung sering berdebar tanpa sebab. Tahu harusnya ke psikolog tapi takut dijudge atau mahal. Ada yang punya pengalaman serupa?",
    location: "Yogyakarta",
    university: "UGM",
    replies: 9,
    upvotes: 11,
    timeAgo: "8 jam lalu",
    category: "mental-health",
  },
  {
    id: "5",
    title: "Imposter syndrome di tempat kerja baru",
    content:
      "Fresh graduate baru 2 bulan kerja, tapi kok ngerasa gak kompeten ya. Takut ketahuan kalau sebenarnya gak ngerti apa-apa. Kolega lain keliatan pinter-pinter semua.",
    location: "Surabaya",
    replies: 14,
    upvotes: 19,
    timeAgo: "1 hari lalu",
    category: "work",
  },
]

export default function KomunitasPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredPosts = communityPosts.filter((post) => {
    const locationMatch =
      selectedLocation === "all" || post.location === selectedLocation || post.university === selectedLocation
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory
    return locationMatch && categoryMatch
  })

  const getCategoryLabel = (category: string) => {
    const labels = {
      academic: "Akademik",
      work: "Pekerjaan",
      relationship: "Hubungan",
      "mental-health": "Kesehatan Mental",
      general: "Umum",
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: "bg-blue-100 text-blue-800",
      work: "bg-green-100 text-green-800",
      relationship: "bg-pink-100 text-pink-800",
      "mental-health": "bg-purple-100 text-purple-800",
      general: "bg-gray-100 text-gray-800",
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
              <Link href="/tanya-teman" className="text-gray-600 hover:text-gray-800 transition-colors">
                Tanya Teman
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Komunitas</h2>
          <p className="text-gray-600">
            Terhubung dengan sesama mahasiswa dan pekerja. Berbagi pengalaman dan saling mendukung.
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Wilayah/Universitas</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lokasi</SelectItem>
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                    <SelectItem value="UNS">UNS</SelectItem>
                    <SelectItem value="ITB">ITB</SelectItem>
                    <SelectItem value="UGM">UGM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="academic">Akademik</SelectItem>
                    <SelectItem value="work">Pekerjaan</SelectItem>
                    <SelectItem value="relationship">Hubungan</SelectItem>
                    <SelectItem value="mental-health">Kesehatan Mental</SelectItem>
                    <SelectItem value="general">Umum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-800 mb-2">1,247</div>
              <p className="text-gray-600">Anggota Aktif</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-800 mb-2">3,891</div>
              <p className="text-gray-600">Diskusi Berlangsung</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-800 mb-2">12,456</div>
              <p className="text-gray-600">Dukungan Diberikan</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-purple-600 cursor-pointer">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{post.location}</span>
                            {post.university && <span>• {post.university}</span>}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(post.category)}>{getCategoryLabel(post.category)}</Badge>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.replies} tanggapan</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{post.upvotes} dukungan</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat & Bantu
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ingin Berbagi Cerita?</h3>
            <p className="mb-6 opacity-90">
              Jangan ragu untuk membagikan pengalamanmu. Komunitas ini ada untuk saling mendukung dan menguatkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tanya-teman">
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Tanyakan ke Komunitas
                </Button>
              </Link>
              <Link href="/curhat">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                >
                  Curhat Pribadi
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
