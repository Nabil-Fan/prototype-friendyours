"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, ThumbsUp, MapPin, Users, Clock, Eye, Send, Search, Sparkle, CheckCircle, ArrowLeft, Bot, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface CommunityPost {
  id: string
  title: string
  content: string
  location: string
  university?: string
  replies: number
  upvotes: number
  timeAgo: string
  timestamp: Date;
  category: "academic" | "work" | "relationship" | "mental-health" | "general"
  isResolved?: boolean;
}

const allCommunityPosts: CommunityPost[] = [
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
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "academic",
    isResolved: false,

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
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    category: "work",
    isResolved: false,
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
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    category: "relationship",
    isResolved: true,
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
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    category: "mental-health",
    isResolved: false,
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
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: "work",
    isResolved: false,
  },
  {
    id: "6",
    title: "Mencari teman diskusi tentang perspektif Islam",
    content: "Saya ingin mendalami Islam lebih lanjut, ada yang mau jadi teman ngobrol atau merekomendasikan komunitas online?",
    location: "Malang",
    replies: 5,
    upvotes: 7,
    timeAgo: "12 jam lalu",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    category: "general",
    isResolved: false,
  },
  {
    id: "7",
    title: "Sulit fokus saat belajar karena kecemasan",
    content: "Tiap kali mau belajar buat ujian, rasanya cemas banget sampai gak bisa fokus. Ada tips biar tenang?",
    location: "Medan",
    replies: 10,
    upvotes: 15,
    timeAgo: "1 hari lalu",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: "mental-health",
    isResolved: false,
  },
  {
    id: "8",
    title: "Manajemen waktu saat tekanan kerja tinggi",
    content: "Pekerjaan menumpuk, rasanya tertekan banget dan sulit atur waktu. Ada yang punya strategi jitu?",
    location: "Solo",
    replies: 7,
    upvotes: 10,
    timeAgo: "2 hari lalu",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: "work",
    isResolved: false,
  },
  {
    id: "9",
    title: "Cara menghadapi overthinking di hubungan LDR",
    content: "Pacar LDR, sering overthinking hal-hal kecil. Gimana ya caranya biar ga terlalu cemas dan bisa percaya?",
    location: "Bandung",
    replies: 15,
    upvotes: 20,
    timeAgo: "3 hari lalu",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: "relationship",
    isResolved: false,
  },
];

type FilterCategoryValue = CommunityPost['category'] | "all" | "tekanan-kerja" | "kecemasan" | "perspektif-islam" | "hubungan-sosial";

// Define all possible categories with their labels, including the 'granular' filter options
const postCategories: { value: FilterCategoryValue; label: string; primaryCategory?: CommunityPost['category'] }[] = [
  { value: "all", label: "Semua Kategori" },
  { value: "academic", label: "Akademik" },
  { value: "work", label: "Pekerjaan" },
  { value: "relationship", label: "Hubungan" },
  { value: "mental-health", label: "Kesehatan Mental" },
  { value: "general", label: "Umum" },
  { value: "tekanan-kerja", label: "Tekanan Kerja", primaryCategory: "work" }, // Map to 'work' or 'mental-health' for filtering
  { value: "kecemasan", label: "Kecemasan", primaryCategory: "mental-health" },
  { value: "perspektif-islam", label: "Perspektif Islam", primaryCategory: "general" },
  { value: "hubungan-sosial", label: "Hubungan & Sosial", primaryCategory: "relationship" },
];

const regionsAndUniversities = [
  "all",
  "Solo",
  "Yogyakarta",
  "Jakarta",
  "Bandung",
  "Surabaya", // Added Surabaya
  "Malang",   // Added Malang
  "Medan",    // Added Medan
  "UNS",      // Added UNS
  "ITB",      // Added ITB
  "UGM",      // Added UGM
  "Universitas Gadjah Mada",
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Sebelas Maret",
];


export default function KomunitasPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryValue>("all")

  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState<CommunityPost['category']>("general")
  const [isSubmittingPost, setIsSubmittingPost] = useState(false)
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [feedType, setFeedType] = useState<"terbaru" | "populer">("terbaru")

  const [currentCommunityPosts, setCurrentCommunityPosts] = useState<CommunityPost[]>(allCommunityPosts);

  // State untuk kontrol dropdown "Tanya"
  const [isTanyaDropdownOpen, setIsTanyaDropdownOpen] = useState(false);


  const handleSubmitNewPost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    setIsSubmittingPost(true);

    // Simulasi pengiriman data ke API
    setTimeout(() => {
      const now = new Date();
      const newPost: CommunityPost = {
        id: `post-${now.getTime()}`,
        title: newPostTitle,
        content: newPostContent,
        location: "Anonim Lokasi",
        replies: 0,
        upvotes: 0,
        timeAgo: "Baru saja",
        timestamp: now,
        category: newPostCategory,
        isResolved: false,
      };

      setCurrentCommunityPosts(prevPosts => [newPost, ...prevPosts]);

      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategory("general");
      setShowNewPostForm(false);
      setIsSubmittingPost(false);
      alert("Postingan berhasil diunggah!");
    }, 1500);
  };

  const getCategoryLabel = (categoryValue: string) => {
    const found = postCategories.find(cat => cat.value === categoryValue);
    // If a direct match is found, use its label.
    if (found) {
      return found.label;
    }
    const defaultLabels: { [key in CommunityPost['category']]: string } = {
      academic: "Akademik",
      work: "Pekerjaan",
      relationship: "Hubungan",
      "mental-health": "Kesehatan Mental",
      general: "Umum",
    };
    return defaultLabels[categoryValue as CommunityPost['category']] || categoryValue;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      academic: "bg-blue-100 text-blue-800",
      work: "bg-green-100 text-green-800",
      relationship: "bg-pink-100 text-pink-800",
      "mental-health": "bg-purple-100 text-purple-800",
      general: "bg-gray-100 text-gray-800",
      "tekanan-kerja": "bg-yellow-100 text-yellow-800",
      "kecemasan": "bg-red-100 text-red-800",
      "perspektif-islam": "bg-emerald-100 text-emerald-800",
      "hubungan-sosial": "bg-pink-200 text-pink-900",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }


  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...currentCommunityPosts];

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.content.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (selectedCategory !== "all") {
      let targetCategories: CommunityPost['category'][] = [];
      const selectedCategoryObj = postCategories.find(cat => cat.value === selectedCategory);

      if (selectedCategoryObj?.primaryCategory) {
        targetCategories = [selectedCategoryObj.primaryCategory];
      } else {
        targetCategories = [selectedCategory as CommunityPost['category']];
      }

      filtered = filtered.filter((post) => targetCategories.includes(post.category));
    }


    if (selectedLocation !== "all") {
      filtered = filtered.filter(post =>
        post.location === selectedLocation || post.university === selectedLocation
      );
    }


    if (feedType === "terbaru") {
      filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    } else {
      filtered.sort((a, b) => {
        const scoreA = a.upvotes * 2 + a.replies;
        const scoreB = b.upvotes * 2 + b.replies;
        return scoreB - scoreA;
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLocation, feedType, currentCommunityPosts]);

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
                onClick={() => window.history.back()} // Menggunakan window.history.back() untuk kembali
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <Link href="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-pink-500" />
                <h1 className="text-2xl font-bold text-gray-800">FriendYours</h1>
              </Link>
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
                  className="text-purple-600 font-semibold transition-colors focus:outline-none flex items-center"
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-start md:space-x-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Komunitas</h2>
            <p className="text-gray-600">
              Terhubung dengan sesama mahasiswa dan pekerja. Berbagi pengalaman dan saling mendukung.
            </p>
          </div>

          <div className="flex flex-col items-start text-sm md:mt-0">
            <div className="flex items-center text-gray-700 p-2">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <span className="font-bold text-lg">1,247</span>
              <span className="text-xs ml-1">Anggota Aktif</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <div className="flex items-center p-2">
                <MessageCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="font-bold text-lg">3,891</span>
                <span className="text-xs ml-1">Diskusi Berlangsung</span>
              </div>
              <div className="flex items-center p-2">
                <Heart className="h-6 w-6 text-pink-500 mr-2" />
                <span className="font-bold text-lg">12,456</span>
                <span className="text-xs ml-1">Dukungan Diberikan</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Buat Post Baru</span>
              {!showNewPostForm && (
                <Button
                  onClick={() => setShowNewPostForm(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Unggah Cerita
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          {showNewPostForm && (
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="new-post-title" className="block text-sm font-medium text-gray-700 mb-2">Judul Postingan</label>
                <Input
                  id="new-post-title"
                  placeholder="Tulis judul singkat untuk postingan Anda..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div>
                <label htmlFor="new-post-content" className="block text-sm font-medium text-gray-700 mb-2">Isi Postingan</label>
                <Textarea
                  id="new-post-content"
                  placeholder="Bagikan cerita atau pemikiran Anda di sini..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div>
                <label htmlFor="new-post-category" className="block text-sm font-medium text-gray-700 mb-2">Pilih Topik/Kategori</label>
                <Select
                  value={newPostCategory}
                  onValueChange={(value) => setNewPostCategory(value as CommunityPost['category'])}
                >
                  <SelectTrigger className="w-full border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    {postCategories.filter(cat => cat.value !== "all" && !cat.primaryCategory).map((cat) => ( // Only show primary categories for new post
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Postingan Anda akan ditampilkan secara anonim
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowNewPostForm(false)} disabled={isSubmittingPost}>
                    Batal
                  </Button>
                  <Button
                    onClick={handleSubmitNewPost}
                    disabled={!newPostTitle.trim() || !newPostContent.trim() || isSubmittingPost}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isSubmittingPost ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Mengunggah...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Unggah Postingan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Wilayah/Universitas</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Lokasi" />
                </SelectTrigger>
                <SelectContent side="top" className="z-[999]">
                  {regionsAndUniversities.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item === "all" ? "Semua Wilayah/Universitas" : item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as FilterCategoryValue)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent side="top" className="z-[999]">
                  {postCategories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

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
            {postCategories.map((cat) => (
              <Badge
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "secondary"}
                onClick={() => setSelectedCategory(cat.value)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === cat.value
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors`}
              >
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {feedType === "terbaru" ? "Post Terbaru" : "Post Populer"}
          </h3>

          {filteredAndSortedPosts.length === 0 && (
            <p className="text-gray-500 text-center py-8">Tidak ada postingan yang cocok dengan kriteria Anda.</p>
          )}

          {filteredAndSortedPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 cursor-pointer">
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
                    {/* Use getCategoryLabel for displaying the badge as well */}
                    <Badge className={getCategoryColor(post.category)}>{getCategoryLabel(post.category)}</Badge>
                  </div>
                  {post.isResolved && (
                    <Badge className="bg-green-100 text-green-800 flex items-center space-x-1 ml-auto">
                      <CheckCircle className="h-3 w-3" />
                      <span>Terselesaikan</span>
                    </Badge>
                  )}
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

                  {/* Corrected Link usage */}
                  <Link href={`/komunitas/${post.id}`} passHref>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50 bg-transparent flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Lihat & Bantu
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
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