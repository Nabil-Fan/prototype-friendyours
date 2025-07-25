"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  User,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  Edit,
  Save,
  X,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface UserProfile {
  username: string
  email: string
  joinDate: string
  totalPosts: number
  totalComments: number
  moodEntries: number
  consultations: number
}

const mockProfile: UserProfile = {
  username: "Sahabat_Anonim_123",
  email: "user@example.com",
  joinDate: "15 Januari 2024",
  totalPosts: 8,
  totalComments: 23,
  moodEntries: 45,
  consultations: 2,
}

const faqData = [
  {
    question: "Bagaimana cara menjaga anonimitas saya?",
    answer:
      "FriendYours menggunakan sistem username anonim dan tidak menyimpan data pribadi yang dapat mengidentifikasi Anda. Semua percakapan dan post bersifat anonim.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Ya, kami menggunakan enkripsi end-to-end untuk semua komunikasi dan tidak menyimpan data sensitif. Data mood tracking hanya tersimpan di device Anda.",
  },
  {
    question: "Bagaimana cara menghubungi psikolog?",
    answer:
      "Anda dapat mengakses direktori psikolog melalui menu utama, memilih psikolog yang sesuai, dan melakukan konsultasi berbayar setelah registrasi.",
  },
  {
    question: "Apakah layanan ini gratis?",
    answer:
      "Fitur dasar seperti curhat AI, komunitas, dan mood tracking gratis. Konsultasi dengan psikolog profesional berbayar sesuai tarif yang tertera.",
  },
  {
    question: "Bagaimana cara mengatasi krisis mental?",
    answer:
      "Jika Anda mengalami krisis mental, segera hubungi hotline darurat 119 ext 8 atau WhatsApp 0811-9999-119. Kami juga memiliki sistem deteksi krisis otomatis.",
  },
]

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState("profil")
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(mockProfile)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleSaveProfile = () => {
    // Save profile logic here
    console.log("Saving profile:", editedProfile)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedProfile(mockProfile)
    setIsEditing(false)
  }

  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...")
    setShowLogoutConfirm(false)
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
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Pengaturan</h2>
          <p className="text-gray-600">Kelola profil dan pengaturan akun Anda</p>
        </div>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white">
              <CardHeader>
                <CardTitle>Konfirmasi Logout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Apakah Anda yakin ingin keluar dari akun?</p>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowLogoutConfirm(false)} className="flex-1">
                    Batal
                  </Button>
                  <Button onClick={handleLogout} className="flex-1 bg-red-600 hover:bg-red-700">
                    Ya, Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="profil" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="pengaturan" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Pengaturan</span>
            </TabsTrigger>
            <TabsTrigger value="bantuan" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Bantuan</span>
            </TabsTrigger>
            <TabsTrigger value="tentang" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Tentang</span>
            </TabsTrigger>
          </TabsList>

          {/* Profil Tab */}
          <TabsContent value="profil" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Informasi Profil</CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Batal
                      </Button>
                      <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Simpan
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{mockProfile.username}</h3>
                    <p className="text-gray-600">Bergabung sejak {mockProfile.joinDate}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username Anonim</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.username}
                        onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                        placeholder="Username anonim"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{mockProfile.username}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Opsional)</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        placeholder="Email untuk recovery"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{mockProfile.email}</p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Profil Anda bersifat anonim. Username dan email hanya digunakan untuk keperluan teknis dan tidak
                    akan ditampilkan kepada pengguna lain.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Statistik */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Aktivitas Saya</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">{mockProfile.totalPosts}</div>
                    <p className="text-sm text-gray-600">Post Komunitas</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockProfile.totalComments}</div>
                    <p className="text-sm text-gray-600">Komentar</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{mockProfile.moodEntries}</div>
                    <p className="text-sm text-gray-600">Jurnal Mood</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{mockProfile.consultations}</div>
                    <p className="text-sm text-gray-600">Konsultasi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pengaturan Tab */}
          <TabsContent value="pengaturan" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pengaturan Akun</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Keamanan</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Settings className="h-4 w-4 mr-2" />
                      Ganti Kata Sandi
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="h-4 w-4 mr-2" />
                      Pengaturan Privasi
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Notifikasi</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Notifikasi Komunitas</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Reminder Jurnal Mood</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span>Update Konsultasi</span>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Data</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Export Data Saya
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      Hapus Akun
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bantuan Tab */}
          <TabsContent value="bantuan" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bantuan & Dukungan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Hubungi Kami</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                      <span className="font-medium">Live Chat</span>
                      <span className="text-xs text-gray-500">Respons dalam 5 menit</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    >
                      <Mail className="h-6 w-6 text-green-600" />
                      <span className="font-medium">Email Support</span>
                      <span className="text-xs text-gray-500">support@friendyours.com</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Hotline Darurat</h4>
                  <div className="bg-red-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Hotline Kesehatan Mental: 119 ext 8</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">WhatsApp Konseling: 0811-9999-119</span>
                    </div>
                    <p className="text-sm text-red-700 mt-2">
                      Jika Anda mengalami krisis mental atau pikiran untuk menyakiti diri, segera hubungi nomor di atas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pertanyaan Umum (FAQ)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h5 className="font-semibold text-gray-800 mb-2">{faq.question}</h5>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tentang Tab */}
          <TabsContent value="tentang" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tentang FriendYours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Misi Kami</h4>
                  <p className="text-gray-600 leading-relaxed">
                    FriendYours hadir untuk memberikan dukungan kesehatan mental yang mudah diakses, anonim, dan
                    terpercaya bagi mahasiswa dan pekerja di Indonesia. Kami percaya bahwa setiap orang berhak
                    mendapatkan dukungan mental yang berkualitas tanpa stigma.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Fitur Utama</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge className="bg-indigo-100 text-indigo-800">AI Chatbot Empatik</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Komunitas Anonim</Badge>
                      <Badge className="bg-green-100 text-green-800">Mood Tracking</Badge>
                    </div>
                    <div className="space-y-2">
                      <Badge className="bg-purple-100 text-purple-800">Direktori Psikolog</Badge>
                      <Badge className="bg-orange-100 text-orange-800">Sumber Daya Edukatif</Badge>
                      <Badge className="bg-red-100 text-red-800">Deteksi Krisis</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Kebijakan Privasi</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Kami berkomitmen melindungi privasi Anda. Semua data bersifat anonim dan dienkripsi. Kami tidak
                    menyimpan informasi pribadi yang dapat mengidentifikasi Anda.
                  </p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Baca Kebijakan Lengkap
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Syarat & Ketentuan</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Dengan menggunakan FriendYours, Anda menyetujui syarat dan ketentuan yang berlaku. Platform ini
                    tidak menggantikan konsultasi medis profesional.
                  </p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Baca Syarat Lengkap
                  </Button>
                </div>

                <div className="text-center pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-4">
                    © 2024 FriendYours. Dibuat dengan ❤️ untuk kesehatan mental yang lebih baik.
                  </p>
                  <Button
                    onClick={() => setShowLogoutConfirm(true)}
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
