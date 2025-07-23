import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Heart, Bot, Settings, Sparkle, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FriendYours - Ruang Curhat Anonim",
  description: "Platform kesehatan mental untuk mahasiswa dan pekerja Indonesia",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="h-full">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-300">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

              <div>
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Heart className="h-8 w-8 text-pink-500" />
                  <span className="text-2xl font-bold text-white">FriendYours</span>
                </Link>

                <h3 className="text-xl font-bold text-white mb-4">Ruang aman untuk berbagi dan tumbuh bersama. Platform kesehatan mental untuk mahasiswa dan pekerja Indonesia.</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Layanan Kami</h3>
                <ul className="space-y-2">
                  <li><Link href="/curhat" className="hover:text-white transition-colors">Curhat Anonim</Link></li>
                  <li><Link href="/tracking" className="hover:text-white transition-colors">Mood Tracking</Link></li>
                  <li><Link href="/komunitas" className="hover:text-white transition-colors">Komunitas Suportif</Link></li>
                  <li><Link href="/tanya-teman" className="hover:text-white transition-colors">Tanya Teman</Link></li>
                  <li>
                    <Link href="/tanya-psikolog" className="text-purple-400 hover:text-purple-200 font-bold transition-colors flex items-center">
                      <Sparkle className="h-4 w-4 mr-1" /> Tanya Psikolog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Perusahaan</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/Konten" className="hover:text-white transition-colors">Artikel & Konten</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>Jebres, Surakarta, Jawa Tengah, Indonesia</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>(025) 3686 25 16</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>info@friendyours.com</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} FriendYours. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}