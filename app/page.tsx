"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, TrendingUp, Users, Shield, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold text-gray-800">FriendYours</h1>
            </div>
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
              <Link href="/tanya-teman" className="text-gray-600 hover:text-gray-800 transition-colors">
                Tanya Teman
              </Link>
              <Link href="/Psikolog" className="text-gray-600 hover:text-gray-800 transition-colors">
                Psikolog
              </Link>
              <Link href="/setting" className="text-gray-600 hover:text-gray-800 transition-colors">
                Pengaturan
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">FriendYours</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            Ruang Curhat Anonim untuk Mahasiswa & Pekerja
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bantu atasi stres, depresi, dan rasa tertekan melalui AI yang empatik dan komunitas suportif. Kamu tidak
            sendirian dalam perjalanan ini.
          </p>

          <Link href="/curhat">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Mulai Curhat
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Curhat Anonim</h3>
              <p className="text-gray-600 leading-relaxed">
                Ceritakan keluh kesahmu tanpa khawatir identitas terbongkar
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Empatik</h3>
              <p className="text-gray-600 leading-relaxed">Dapatkan respons yang memahami dan mendukung dari AI</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Mood Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Pantau perkembangan suasana hatimu setiap hari</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Komunitas</h3>
              <p className="text-gray-600 leading-relaxed">Terhubung dengan sesama mahasiswa dan pekerja</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Privasi & Keamanan Terjamin</h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Semua percakapan bersifat anonim dan aman. Kami berkomitmen melindungi privasi dan memberikan ruang yang
              nyaman untuk berbagi.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold text-gray-800">FriendYours</span>
          </div>
          <p className="text-gray-600 mb-4">Ruang aman untuk berbagi dan tumbuh bersama</p>
          <p className="text-sm text-gray-500">
            © 2025 FriendYours.
          </p>
        </div>
      </footer>
    </div>
  )
}
