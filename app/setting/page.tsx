"use client";

import Link from "next/link";
import { Heart, LogOut, HelpCircle, User, KeyRound, Info, Shield } from "lucide-react";

export default function SettingPage() {
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
              <Link href="/tanya-teman" className="text-gray-600 hover:text-gray-800 transition-colors">
                Tanya Teman
              </Link>
              <Link href="/Psikolog" className="text-gray-600 hover:text-gray-800 transition-colors">
                Psikolog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-10">Profil & Pengaturan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profil */}
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <User className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-lg font-semibold text-gray-800">Halaman Profil Saya</span>
            </div>
            <ul className="text-gray-600 text-base ml-2">
              <li>• Nama Pengguna <span className="italic">(Anonim)</span></li>
            </ul>
          </div>
          {/* Pengaturan Akun */}
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <KeyRound className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-lg font-semibold text-gray-800">Pengaturan Akun</span>
            </div>
            <ul className="text-gray-600 text-base ml-2">
              <li>• Ganti Kata Sandi</li>
            </ul>
          </div>
          {/* Bantuan & Dukungan */}
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-lg font-semibold text-gray-800">Bantuan & Dukungan</span>
            </div>
            <ul className="text-gray-600 text-base ml-2 space-y-1">
              <li>• FAQ (Pertanyaan Umum)</li>
              <li>• Hubungi Dukungan</li>
              <li>• Tentang Kami</li>
              <li>• Kebijakan Privasi & Syarat Ketentuan</li>
            </ul>
          </div>
          {/* Logout */}
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <LogOut className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-lg font-semibold text-gray-800">Logout</span>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition"
              // onClick={handleLogout} // Tambahkan fungsi logout sesuai autentikasi Anda
            >
              Keluar Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}  