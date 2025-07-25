"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  ThumbsUp,
  Users,
  Search,
  Plus,
  Filter,
  UserPlus,
  Flag,
  TrendingUp,
  Send,
  ArrowLeft,
  User,
  Clock,
  X,
  Sparkles
} from "lucide-react"
import Link from "next/link"

interface CommunityPost {
  id: string
  title: string
  content: string
  author: string
  timeAgo: string
  replies: number
  upvotes: number
  category: string
  isAnonymous: boolean
  comments: Comment[]
}

interface Comment {
  id: string
  content: string
  author: string
  timeAgo: string
  upvotes: number
}

interface Friend {
  id: string
  username: string
  avatar: string
  interests: string[]
  status: "online" | "offline"
  requestStatus?: "sent" | "received" | "friends"
  postCount?: number
  commentCount?: number
}

interface ChatMessage {
  id: string
  content: string
  sender: "me" | "friend"
  timestamp: Date
}

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    title: "Burnout di usia 25, normal nggak sih?",
    content:
      "Aku baru kerja 2 tahun tapi udah ngerasa burnout banget. Setiap hari kayak zombie, nggak ada motivasi. Apa ini normal di usia segini?",
    author: "Anonim_User_001",
    timeAgo: "2 jam lalu",
    replies: 15,
    upvotes: 23,
    category: "Tekanan Kerja",
    isAnonymous: true,
    comments: [
      {
        id: "1",
        content: "Aku juga ngalamin hal yang sama. Coba ambil cuti sejenak untuk refresh pikiran.",
        author: "Anonim_User_045",
        timeAgo: "1 jam lalu",
        upvotes: 8,
      },
    ],
  },
  {
    id: "2",
    title: "Cara mengatasi kecemasan berlebihan",
    content:
      "Akhir-akhir ini aku sering overthinking dan cemas berlebihan. Bahkan hal kecil bisa bikin aku panic. Ada yang punya tips?",
    author: "Anonim_User_045",
    timeAgo: "4 jam lalu",
    replies: 28,
    upvotes: 41,
    category: "Kecemasan",
    isAnonymous: true,
    comments: [],
  },
  {
    id: "3",
    title: "Mencari ketenangan dalam doa",
    content:
      "Alhamdulillah, setelah rutin sholat tahajud dan dzikir, hati jadi lebih tenang. Mau sharing pengalaman spiritual yang membantu mental health.",
    author: "Anonim_User_078",
    timeAgo: "6 jam lalu",
    replies: 12,
    upvotes: 35,
    category: "Perspektif Islam",
    isAnonymous: true,
    comments: [],
  },
]

const recommendedFriends: Friend[] = [
  {
    id: "1",
    username: "Sahabat_Baik_01",
    avatar: "👤",
    interests: ["Burnout", "Kecemasan"],
    status: "online",
    postCount: 12,
    commentCount: 45,
  },
  {
    id: "2",
    username: "Teman_Curhat_02",
    avatar: "👤",
    interests: ["Hubungan & Sosial", "Perspektif Islam"],
    status: "offline",
    postCount: 8,
    commentCount: 23,
  },
  {
    id: "3",
    username: "Support_Friend_03",
    avatar: "👤",
    interests: ["Depresi", "Akademik"],
    status: "online",
    postCount: 15,
    commentCount: 67,
  },
]

const categories = [
  "Semua",
  "Tekanan Kerja",
  "Kecemasan",
  "Perspektif Islam",
  "Hubungan & Sosial",
  "Burnout",
  "Depresi",
  "Akademik",
]

export default function KomunitasPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState<"login"|"register">("login")

  const [activeTab, setActiveTab] = useState("feed")
  const [feedTab, setFeedTab] = useState("terbaru")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [friendSearchQuery, setFriendSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
  const [newComment, setNewComment] = useState("")

  // Friend mode states
  const [activeChatFriend, setActiveChatFriend] = useState<Friend | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [friendRequests, setFriendRequests] = useState([
    { id: "1", username: "Sahabat_Baru_03", status: "received" },
    { id: "2", username: "Teman_Curhat_04", status: "sent" },
  ])

  const filteredPosts = communityPosts.filter((post) => {
    const categoryMatch = selectedCategory === "Semua" || post.category === selectedCategory
    const searchMatch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (feedTab === "populer") {
      return b.upvotes - a.upvotes
    }
    return 0 // Keep original order for "terbaru"
  })

  const handleCreatePost = () => {
    console.log("Creating post:", { newPostTitle, newPostContent, newPostCategory })
    setShowNewPost(false)
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostCategory("")
  }

  const handleSendFriendRequest = (friendId: string) => {
    console.log("Sending friend request to:", friendId)
  }

  const handleAcceptFriendRequest = (requestId: string) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const handleRejectFriendRequest = (requestId: string) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const handleStartChat = (friend: Friend) => {
    setActiveChatFriend(friend)
    setChatMessages([
      {
        id: "1",
        content: "Hai! Terima kasih sudah menerima permintaan pertemananku 😊",
        sender: "friend",
        timestamp: new Date(),
      },
    ])
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return
    console.log("Adding comment to post:", postId, newComment)
    setNewComment("")
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Komunitas</h2>
          <p className="text-gray-600">
            Terhubung dengan sesama, berbagi pengalaman, dan saling mendukung dalam perjalanan kesehatan mental
          </p>
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-purple-100 text-purple-800">{selectedPost.category}</Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{selectedPost.timeAgo}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle>{selectedPost.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">{selectedPost.content}</p>

                <div className="flex items-center justify-between py-4 border-y">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{selectedPost.replies}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{selectedPost.upvotes}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{selectedPost.author}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Dukung
                    </Button>
                    <Button size="sm" variant="outline">
                      <Flag className="h-4 w-4" />
                      Laporkan
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Balasan ({selectedPost.comments.length})</h4>

                  {/* Add Comment */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Tulis balasan yang membantu..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-20"
                    />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleAddComment(selectedPost.id)}
                        disabled={!newComment.trim()}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Kirim Balasan
                      </Button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <ThumbsUp className="h-3 w-3" />
                            <span className="text-xs">{comment.upvotes}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feed" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Feed Komunitas</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Mode Teman</span>
            </TabsTrigger>
          </TabsList>

          {/* Feed Komunitas */}
          <TabsContent value="feed" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Cari topik, kata kunci..."
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
                  <Button
                    onClick={() => setShowNewPost(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Create New Post Modal */}
            {showNewPost && (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Buat Post Baru</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Judul post..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Ceritakan pengalamanmu atau ajukan pertanyaan..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-32"
                  />
                  <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      ℹ️ Post akan dipublikasikan secara anonim untuk menjaga privasi
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>
                      Batal
                    </Button>
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPostTitle || !newPostContent || !newPostCategory}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      Publikasikan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Feed Tabs */}
            <div className="flex space-x-4 mb-6">
              <Button
                variant={feedTab === "terbaru" ? "default" : "outline"}
                onClick={() => setFeedTab("terbaru")}
                className="flex items-center space-x-2"
              >
                <Clock className="h-4 w-4" />
                <span>Terbaru</span>
              </Button>
              <Button
                variant={feedTab === "populer" ? "default" : "outline"}
                onClick={() => setFeedTab("populer")}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Populer</span>
              </Button>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-purple-100 text-purple-800">{post.category}</Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{post.timeAgo}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">{post.content}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-gray-500">
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{post.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-sm">{post.upvotes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <User className="h-4 w-4" />
                              <span className="text-sm">{post.author}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Dukung
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Balas
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mode Teman */}
          <TabsContent value="friends" className="space-y-6">
            {activeChatFriend ? (
              // Chat Interface
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" onClick={() => setActiveChatFriend(null)}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-2xl">{activeChatFriend.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{activeChatFriend.username}</h3>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${activeChatFriend.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                          />
                          <span className="text-sm text-gray-500 capitalize">{activeChatFriend.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Minat:</p>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {activeChatFriend.interests.slice(0, 2).map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-2xl ${
                            message.sender === "me"
                              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white/70" : "text-gray-500"}`}>
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
                        placeholder="Ketik pesan..."
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
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Friend Search */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Cari Teman</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Cari berdasarkan ID atau username..."
                        value={friendSearchQuery}
                        onChange={(e) => setFriendSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Friend Requests */}
                {friendRequests.length > 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Permintaan Pertemanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {friendRequests.map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">👤</div>
                              <div>
                                <h4 className="font-medium">{request.username}</h4>
                                <p className="text-sm text-gray-500">
                                  {request.status === "received"
                                    ? "Mengirim permintaan pertemanan"
                                    : "Permintaan terkirim - Menunggu konfirmasi"}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {request.status === "received" ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleRejectFriendRequest(request.id)}
                                  >
                                    Tolak
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleAcceptFriendRequest(request.id)}
                                  >
                                    Terima
                                  </Button>
                                </>
                              ) : (
                                <Badge className="bg-blue-100 text-blue-800">Terkirim</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recommended Friends */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Rekomendasi Teman</CardTitle>
                    <p className="text-sm text-gray-600">Berdasarkan minat dan topik yang sama</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {recommendedFriends.map((friend) => (
                        <div key={friend.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{friend.avatar}</div>
                            <div className="flex-1">
                              <h4 className="font-medium">{friend.username}</h4>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${friend.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                                />
                                <span className="text-sm text-gray-500 capitalize">{friend.status}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                <span>{friend.postCount} post</span>
                                <span>{friend.commentCount} komentar</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">Minat:</p>
                            <div className="flex flex-wrap gap-1">
                              {friend.interests.map((interest, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleSendFriendRequest(friend.id)}
                              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Kirim Permintaan
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartChat(friend)}
                              className="flex-1"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
