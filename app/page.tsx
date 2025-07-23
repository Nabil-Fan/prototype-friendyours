"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  TrendingUp,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  Heart,
  Bot,
  Settings,
  Book,
  Video,
  Mic,
  Wind,
  Lightbulb,
} from "lucide-react";

interface Resource {
  id: string
  title: string
  description: string
  fullContent?: string;
  type: "Artikel" | "Video" | "Podcast" | "Latihan Pernapasan" | "Pencerahan Islami"
  timeEstimate: string
  link: string
  image?: string
  videoEmbedUrl?: string;
  podcastEmbedUrl?: string;
}

const allResources: Resource[] = [
  {
    id: "stress-akademik",
    title: "5 Cara Mengatasi Stres Akademik",
    description: "Artikel ini membahas tips praktis untuk mengelola tekanan belajar dan ujian.",
    fullContent: `Bernapas adalah fungsi vital yang sering kita anggap remeh. Namun, dengan teknik pernapasan yang benar, Anda dapat mengelola stres, meningkatkan fokus, dan menenangkan pikiran. Artikel ini akan memandu Anda melalui beberapa latihan pernapasan dasar yang bisa Anda praktikkan setiap hari.

**1. Pernapasan Perut (Diafragma):**
Latihan ini membantu mengaktifkan diafragma, yang dapat menenangkan sistem saraf.
* Duduk atau berbaring nyaman, letakkan satu tangan di dada dan satu di perut.
* Tarik napas perlahan melalui hidung, rasakan perut Anda mengembang. Dada Anda harus tetap relatif diam.
* Buang napas perlahan melalui mulut, rasakan perut Anda mengempis.
* Ulangi 5-10 kali.

**2. Pernapasan 4-7-8:**
Teknik ini populer untuk membantu tidur dan mengurangi kecemasan.
* Buang napas sepenuhnya melalui mulut, buat suara "whoosh".
* Tarik napas melalui hidung selama 4 hitungan.
* Tahan napas selama 7 hitungan.
* Buang napas sepenuhnya melalui mulut, buat suara "whoosh", selama 8 hitungan.
* Ulangi 3-4 siklus.

**3. Pernapasan Kotak (Box Breathing):**
Ideal untuk meningkatkan fokus dan ketenangan.
* Tarik napas selama 4 hitungan.
* Tahan napas selama 4 hitungan.
* Buang napas selama 4 hitungan.
* Tahan napas selama 4 hitungan (paru-paru kosong).
* Ulangi 4-6 siklus.

Mempraktikkan teknik-teknik ini secara teratur dapat memberikan manfaat besar bagi kesehatan mental Anda. Cobalah luangkan waktu beberapa menit setiap hari untuk bernapas dengan sadar.`,
    type: "Artikel",
    timeEstimate: "5 menit baca",
    link: "/resources/stress-akademik",
    image: "/images/artikel-stress.jpg",
  },
  {
    id: "latihan-pernapasan-video",
    title: "Panduan Latihan Pernapasan (Video)",
    description: "Video ini memandu Anda melalui teknik pernapasan dasar untuk mengurangi kecemasan.",
    type: "Latihan Pernapasan",
    timeEstimate: "12 menit video",
    link: "/resources/latihan-pernapasan-video",
    image: "/images/video-breathing.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/example-video-id",
  },
  {
    id: "pernapasan-artikel",
    title: "Teknik Pernapasan Dasar untuk Mengurangi Stres (Artikel)",
    description: "Panduan lengkap dalam bentuk artikel mengenai berbagai teknik pernapasan yang menenangkan.",
    fullContent: `Bernapas adalah fungsi vital yang sering kita anggap remeh. Namun, dengan teknik pernapasan yang benar, Anda dapat mengelola stres, meningkatkan fokus, dan menenangkan pikiran. Artikel ini akan memandu Anda melalui beberapa latihan pernapasan dasar yang bisa Anda praktikkan setiap hari.

**1. Pernapasan Perut (Diafragma):**
Latihan ini membantu mengaktifkan diafragma, yang dapat menenangkan sistem saraf.
* Duduk atau berbaring nyaman, letakkan satu tangan di dada dan satu di perut.
* Tarik napas perlahan melalui hidung, rasakan perut Anda mengembang. Dada Anda harus tetap relatif diam.
* Buang napas perlahan melalui mulut, rasakan perut Anda mengempis.
* Ulangi 5-10 kali.

**2. Pernapasan 4-7-8:**
Teknik ini populer untuk membantu tidur dan mengurangi kecemasan.
* Buang napas sepenuhnya melalui mulut, buat suara "whoosh".
* Tarik napas melalui hidung selama 4 hitungan.
* Tahan napas selama 7 hitungan.
* Buang napas sepenuhnya melalui mulut, buat suara "whoosh", selama 8 hitungan.
* Ulangi 3-4 siklus.

**3. Pernapasan Kotak (Box Breathing):**
Ideal untuk meningkatkan fokus dan ketenangan.
* Tarik napas selama 4 hitungan.
* Tahan napas selama 4 hitungan.
* Buang napas selama 4 hitungan.
* Tahan napas selama 4 hitungan (paru-paru kosong).
* Ulangi 4-6 siklus.

Mempraktikkan teknik-teknik ini secara teratur dapat memberikan manfaat besar bagi kesehatan mental Anda. Cobalah luangkan waktu beberapa menit setiap hari untuk bernapas dengan sadar.`,
    type: "Artikel",
    timeEstimate: "10 menit baca",
    link: "/resources/pernapasan-artikel",
    image: "/images/artikel-pernapasan.jpg",
  },
  {
    id: "podcast-kesehatan-mental",
    title: "Episode 1: Mengapa Kesehatan Mental Penting?",
    description: "Podcast ini mengupas tuntas stigma seputar kesehatan mental dan cara mencari bantuan.",
    type: "Podcast",
    timeEstimate: "30 menit dengar",
    link: "/resources/podcast-kesehatan-mental",
    image: "/images/podcast-mental.jpg",
    podcastEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/example-track-id",
  },
  {
    id: "kisah-inspiratif-islam",
    title: "Kisah Inspiratif Para Tokoh Islam",
    description: "Serangkaian cerita pendek tentang keteladanan dari para ulama dan cendekiawan Islam.",
    fullContent: `Berikut adalah beberapa kisah inspiratif dari tokoh-tokoh Islam yang dapat memberikan pencerahan:

**Imam Syafi'i: Kegigihan dalam Ilmu**
Imam Syafi'i adalah salah satu ulama terbesar dalam sejarah Islam. Dikenal dengan kecerdasan luar biasa dan hafalan yang kuat sejak usia muda. Kisahnya mengajarkan kita tentang pentingnya kegigihan dalam menuntut ilmu dan dedikasi dalam menyebarkan kebenaran. Ia bepergian jauh, menghadapi banyak kesulitan, namun tak pernah menyerah dalam pencarian pengetahuannya.

**Rabiah Al-Adawiyah: Cinta Ilahi Murni**
Seorang sufi wanita yang terkenal dengan kecintaannya yang murni kepada Allah SWT. Ia tidak mencari surga karena takut neraka, melainkan karena murni mencintai-Nya. Kisahnya menginspirasi kita untuk memiliki cinta yang tulus dan ikhlas dalam beribadah, tanpa pamrih duniawi.

**Ibnu Sina: Dokter dan Filsuf Pencerah**
Dikenal di Barat sebagai Avicenna, ia adalah dokter, ilmuwan, dan filsuf Persia yang karyanya sangat memengaruhi kedokteran dan filsafat selama berabad-abad. Karyanya "The Canon of Medicine" menjadi buku teks standar di banyak universitas. Ibnu Sina menunjukkan bagaimana ilmu pengetahuan dan spiritualitas dapat bersatu dalam mencari kebenaran dan kesejahteraan manusia.

Kisah-kisah ini mengajarkan kita tentang dedikasi, keikhlasan, ketekunan, dan cinta yang tulus. Mereka adalah sumber inspirasi abadi bagi kita semua.`,
    type: "Pencerahan Islami",
    timeEstimate: "7 menit baca",
    link: "/resources/kisah-inspiratif-islam",
    image: "/images/islamic-insight.jpg",
  },
  {
    id: "manajemen-waktu",
    title: "Manajemen Waktu Efektif untuk Mahasiswa",
    description: "Pelajari cara mengatur jadwal agar kuliah, organisasi, dan kehidupan sosial seimbang.",
    fullContent: `Manajemen waktu yang efektif sangat krusial bagi mahasiswa untuk menyeimbangkan tuntutan akademik, kegiatan organisasi, dan kehidupan pribadi. Berikut adalah beberapa strategi yang dapat membantu Anda:

**1. Buat Daftar Prioritas (To-Do List):**
Mulai hari Anda dengan membuat daftar tugas yang harus diselesaikan. Prioritaskan tugas berdasarkan urgensi dan kepentingannya. Gunakan metode seperti Matriks Eisenhower (Penting/Mendesak) untuk membantu Anda memutuskan mana yang harus dikerjakan terlebih dahulu.

**2. Teknik Pomodoro:**
Teknik ini melibatkan bekerja dalam interval waktu fokus (misalnya 25 menit) diikuti dengan istirahat singkat (5 menit). Setelah empat sesi, ambil istirahat lebih panjang (15-30 menit). Ini membantu menjaga fokus dan mencegah burnout.

**3. Hindari Multitasking yang Berlebihan:**
Meskipun terasa produktif, multitasking sebenarnya dapat mengurangi efisiensi dan kualitas kerja. Fokus pada satu tugas pada satu waktu untuk hasil yang lebih baik.

**4. Tetapkan Batasan Waktu:**
Berikan diri Anda batas waktu yang realistis untuk setiap tugas. Ini membantu Anda tetap pada jalur dan menghindari penundaan.

**5. Manfaatkan Waktu Luang:**
Waktu tunggu atau jeda antar kelas dapat digunakan untuk menyelesaikan tugas-tugas kecil, membalas email, atau membaca.

**6. Prioritaskan Tidur Cukup:**
Tidur yang cukup adalah fondasi produktivitas. Kurang tidur akan menurunkan konsentrasi dan kinerja Anda.

Dengan menerapkan strategi-strategi ini, Anda tidak hanya akan menjadi lebih produktif tetapi juga memiliki lebih banyak waktu untuk diri sendiri dan aktivitas yang Anda nikmati.`,
    type: "Artikel",
    timeEstimate: "8 menit baca",
    link: "/resources/manajemen-waktu",
    image: "/images/artikel-time.jpg",
  },
  {
    id: "meditasi-fokus",
    title: "Meditasi Singkat untuk Fokus (Video)",
    description: "Video tutorial tentang teknik meditasi ringan yang bisa dilakukan kapan saja untuk meningkatkan konsentrasi.",
    type: "Video",
    timeEstimate: "10 menit video",
    link: "/resources/meditasi-fokus",
    image: "/images/video-meditation.jpg",
    videoEmbedUrl: "https://www.youtube.com/embed/another-example-id",
  },
  {
    id: "podcast-gratitude",
    title: "Jurnal Bersyukur: Dampaknya pada Kesejahteraan Emosional",
    description: "Podcast yang membahas manfaat praktik jurnal bersyukur dalam kehidupan sehari-hari.",
    type: "Podcast",
    timeEstimate: "25 menit dengar",
    link: "/resources/podcast-gratitude",
    image: "/images/podcast-gratitude.jpg",
    podcastEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/yet-another-track-id",
  },
  {
    id: "doa-dzikir",
    title: "Doa dan Dzikir Penenang Hati",
    description: "Kumpulan doa dan dzikir pilihan dari Al-Qur'an dan Sunnah untuk meraih ketenangan batin.",
    fullContent: `Doa dan dzikir adalah amalan yang sangat dianjurkan dalam Islam untuk menenangkan hati dan mendekatkan diri kepada Allah SWT. Berikut beberapa doa dan dzikir yang bisa diamalkan:

**1. Ayat Kursi:**
Membaca Ayat Kursi dapat memberikan ketenangan dan perlindungan. (QS. Al-Baqarah: 255)

**2. Surat Al-Ikhlas, Al-Falaq, An-Nas:**
Membaca ketiga surat ini sebelum tidur atau di pagi hari dapat menjadi perlindungan dan menenangkan jiwa.

**3. Dzikir Hasbunallah Wanikmal Wakil:**
"Cukuplah Allah bagiku, dan Dia sebaik-baik Pelindung." Dzikir ini diucapkan ketika menghadapi kesulitan atau rasa cemas.

**4. Dzikir La Hawla Wala Quwwata Illa Billah:**
"Tidak ada daya dan kekuatan kecuali dengan pertolongan Allah." Mengucapkannya dapat menghilangkan kesedihan dan kegelisahan.

**5. Shalawat kepada Nabi Muhammad SAW:**
Membaca shalawat dapat mendatangkan keberkahan dan menenangkan hati.

**6. Doa Nabi Yunus:**
"La ilaha illa anta subhanaka inni kuntu minaz zalimin." (Tiada Tuhan selain Engkau, Mahasuci Engkau, sesungguhnya aku termasuk orang-orang yang zalim.) Doa ini dibaca ketika dalam kesulitan.

Membiasakan diri dengan doa dan dzikir ini dapat membantu Anda menemukan kedamaian batin dan kekuatan dalam menghadapi tantangan hidup.`,
    type: "Pencerahan Islami",
    timeEstimate: "15 menit baca",
    link: "/resources/doa-dzikir",
    image: "/images/doa-dzikir.jpg",
  },
];

const getCategoryColor = (type: Resource['type']): string => {
  switch (type) {
    case "Artikel": return "bg-blue-100 text-blue-800";
    case "Video": return "bg-red-100 text-red-800";
    case "Podcast": return "bg-green-100 text-green-800";
    case "Latihan Pernapasan": return "bg-purple-100 text-purple-800";
    case "Pencerahan Islami": return "bg-emerald-100 text-emerald-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getCategoryIcon = (type: Resource['type']) => {
  switch (type) {
    case "Artikel": return <Book className="h-4 w-4 mr-1" />;
    case "Video": return <Video className="h-4 w-4 mr-1" />;
    case "Podcast": return <Mic className="h-4 w-4 mr-1" />;
    case "Latihan Pernapasan": return <Wind className="h-4 w-4 mr-1" />;
    case "Pencerahan Islami": return <Lightbulb className="h-4 w-4 mr-1" />;
    default: return null;
  }
};

export default function HomePage() {
  const [isTanyaDropdownOpen, setIsTanyaDropdownOpen] = useState(false);

  const featuredContentForHome = allResources.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo  */}
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <h1 className="text-2xl font-bold text-gray-800">FriendYours</h1>
            </Link>

            <div className="flex items-center space-x-2 md:hidden">
              <Bot className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-700">Sahabat AI</span>
            </div>

            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/curhat" className="text-gray-600 hover:text-gray-800 transition-colors">
                Curhat
              </Link>
              <Link href="/tracking" className="text-gray-600 hover:text-gray-800 transition-colors">
                Mood Tracking
              </Link>
            
              <div className="relative">
                <button
                  onClick={() => setIsTanyaDropdownOpen(!isTanyaDropdownOpen)}
                  className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none flex items-center"
                >
                  Tanya <span className="ml-1 text-sm">&#9662;</span>
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

          <Link href="/curhat" passHref>
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

      <section className="mt-12 mb-8 container mx-auto px-4 max-w-4xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Konten Terbaru</h2>
          <Link href="/Konten" className="flex items-center text-purple-600 hover:text-purple-800 font-semibold">
            Lihat Semua Konten
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {featuredContentForHome.map((item) => (
            <div
              key={item.id}
              className={`flex-none w-72 p-4 rounded-lg shadow-sm border ${getCategoryColor(item.type)}`} // Gunakan getCategoryColor
            >
              <h3 className="font-semibold mb-2 text-current">{item.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{item.description}</p>
              <div className="flex items-center space-x-2 mb-3">
                {getCategoryIcon(item.type)}
                <span className="text-xs text-gray-600">{item.type}</span>
                <span className="text-xs text-gray-600">• {item.timeEstimate}</span>
              </div>
              <Link href={item.link} className="text-xs text-blue-600 hover:underline">Baca Sekarang &rarr;</Link>
            </div>
          ))}
        </div>
      </section>

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
    </div>
  );
}