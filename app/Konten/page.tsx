"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, ThumbsUp, MapPin, Users, Clock, Eye, Send, Search, Sparkle, CheckCircle, ArrowLeft, Bot, Settings, XCircle, Book, Video, Mic, Wind, Lightbulb } from "lucide-react" // Tambah XCircle, dan icon untuk kategori resource
import Link from "next/link"
import { useRouter } from "next/navigation"

// Define the interface for a resource item (Updated with fullContent, video/podcast URLs)
interface Resource {
  id: string
  title: string
  description: string // Deskripsi singkat
  fullContent?: string; // Konten lengkap untuk artikel/detail
  type: "Artikel" | "Video" | "Podcast" | "Latihan Pernapasan" | "Pencerahan Islami"
  timeEstimate: string // e.g., "5 min read", "10 min video"
  link: string // Link asli, tapi tidak lagi digunakan untuk navigasi langsung dari tombol
  image?: string // Optional image for display
  videoEmbedUrl?: string; // Untuk video
  podcastEmbedUrl?: string; // Untuk podcast
}

// Sample data for resources (Disalin dari file [resourceId]/page.tsx sebelumnya)
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
    videoEmbedUrl: "https://youtu.be/0LqWXlBfBxE?si=5XlfY9jZaOBGo6qa",
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
    podcastEmbedUrl: "https://podcasts.apple.com/id/podcast/kesehatan-mental/id1533526992?i=1000492608580&l=id", // Ganti dengan URL embed Soundcloud/Spotify yang sebenarnya
  },
  {
    id: "Burnout",
    title: "Aku Capek Tapi Nggak Tahu Kenapa: Kenali Emotional Burnout",
    description: "Kamu merasa lelah meski sudah tidur cukup? Mungkin itu tanda emotional burnout. Temukan cara mengatasinya di sini.",
    fullContent: ` Pernah ngerasa begini?
Tidur cukup. Makan teratur. Tapi hati tetap kosong.
Kamu nggak sendiri. Mungkin itu tanda emotional burnout — kelelahan batin karena terus menahan, berpura-pura kuat, atau nggak punya ruang untuk jadi diri sendiri.

Coba ini:
💬 Akui: “Aku capek, dan itu wajar.”
📝 Tulis isi hati, tanpa disensor.
🧘 Ambil jeda, bahkan 5 menit pun cukup.
💡 Kecilkan target harian, jangan paksa diri.
🤖 Curhat ke FriendYours — tempat aman tanpa penghakiman.

Kamu boleh lelah.
Tapi kamu nggak harus lelah sendirian. 💛`,
    type: "Artikel",
    timeEstimate: "7 menit baca",
    link: "/resources/",
    image: "/images/",
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
    videoEmbedUrl: "https://youtu.be/zSkFFW--Ma0?si=pJOTFuarVn3Drq42",
  },
  {
    id: "podcast-gratitude",
    title: "Jurnal Bersyukur: Dampaknya pada Kesejahteraan Emosional",
    description: "Podcast yang membahas manfaat praktik jurnal bersyukur dalam kehidupan sehari-hari.",
    type: "Podcast",
    timeEstimate: "25 menit dengar",
    link: "/resources/podcast-gratitude",
    image: "/images/podcast-gratitude.jpg",
    podcastEmbedUrl: "https://podcasts.apple.com/id/podcast/cara-dan-makna-bersyukur-kesehatan-mental-self-leadership/id1558090423?i=1000520247010&l=id", // Ganti dengan URL embed Soundcloud/Spotify yang sebenarnya
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
    link: "https://kemenag.go.id/hikmah/3-cara-tenangkan-hati-yang-galau-fWgXT",
    image: "/images/doa-dzikir.jpg",
  },
];

// Define all possible categories for filtering
const resourceCategories = [
  "Semua Kategori",
  "Artikel",
  "Video",
  "Podcast",
  "Latihan Pernapasan",
  "Pencerahan Islami",
];

// Function to get color for category badges
const getCategoryColor = (type: Resource['type']) => {
  switch (type) {
    case "Artikel":
      return "bg-blue-100 text-blue-800";
    case "Video":
      return "bg-red-100 text-red-800";
    case "Podcast":
      return "bg-green-100 text-green-800";
    case "Latihan Pernapasan":
      return "bg-purple-100 text-purple-800";
    case "Pencerahan Islami":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Function to get icon for category badges
const getCategoryIcon = (type: Resource['type']) => {
  switch (type) {
    case "Artikel":
      return <Book className="h-4 w-4 mr-1" />;
    case "Video":
      return <Video className="h-4 w-4 mr-1" />;
    case "Podcast":
      return <Mic className="h-4 w-4 mr-1" />;
    case "Latihan Pernapasan":
      return <Wind className="h-4 w-4 mr-1" />;
    case "Pencerahan Islami":
      return <Lightbulb className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

// ===============================================
// Komponen Modal/Drawer untuk Detail Sumber Daya
// ===============================================
interface ResourceDetailModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, isOpen, onClose }) => {
  if (!isOpen || !resource) return null;

  return (
    // Overlay backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      {/* Modal content area */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 z-10"
        >
          <XCircle className="h-6 w-6" />
        </Button>

        {/* Modal Header (optional, but good for title) */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{resource.title}</h2>
          <Badge className={`${getCategoryColor(resource.type)} flex items-center mt-2 px-3 py-1`}>
            {getCategoryIcon(resource.type)}
            {resource.type}
            <span className="ml-2 text-sm">{resource.timeEstimate}</span>
          </Badge>
        </div>

        {/* Modal Body / Content */}
        <div className="p-6">
          {resource.image && (
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-48 object-cover rounded-md mb-6 shadow-sm"
            />
          )}

          {/* Menampilkan konten lengkap atau embed berdasarkan tipe */}
          <div className="text-gray-700 leading-relaxed">
            {resource.fullContent ? ( // Jika ada fullContent, tampilkan sebagai artikel
              // Menggunakan dangerouslySetInnerHTML untuk merender konten HTML/Markdown
              <div dangerouslySetInnerHTML={{ __html: resource.fullContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ) : resource.type === "Video" || resource.type === "Latihan Pernapasan" ? (
              <div>
                <h3 className="text-xl font-semibold mb-3">Tonton Video</h3>
                {resource.videoEmbedUrl ? (
                  <div className="aspect-video w-full bg-gray-300 rounded-md">
                    <iframe
                      src={resource.videoEmbedUrl}
                      title={resource.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-md"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-300 rounded-md flex items-center justify-center text-gray-500">
                    <p>Video player placeholder untuk: {resource.title}</p>
                  </div>
                )}
                <p className="mt-4 text-sm">{resource.description}</p>
              </div>
            ) : resource.type === "Podcast" ? (
              <div>
                <h3 className="text-xl font-semibold mb-3">Dengarkan Podcast</h3>
                {resource.podcastEmbedUrl ? (
                  <div className="w-full bg-gray-300 rounded-md">
                     <iframe
                       width="100%"
                       height="166"
                       scrolling="no"
                       frameBorder="no"
                       allow="autoplay"
                       src={resource.podcastEmbedUrl}>
                     </iframe>
                  </div>
                ) : (
                  <div className="w-full bg-gray-300 rounded-md flex items-center justify-center text-gray-500 h-24">
                    <p>Audio player placeholder untuk: {resource.title}</p>
                  </div>
                )}
                <p className="mt-4 text-sm">{resource.description}</p>
              </div>
            ) : (
              // Fallback for types without specific fullContent or embed URLs
              <div>
                <h3 className="text-xl font-semibold mb-3">Detail</h3>
                <p>{resource.description}</p>
                <p className="mt-4 text-sm text-gray-500">Konten lengkap untuk sumber daya ini belum tersedia dalam format yang dapat ditampilkan di sini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// ===============================================
// Komponen Halaman Utama Sumber Daya (KontenPage)
// ===============================================
export default function KontenPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk kontrol dropdown "Tanya"
  const [isTanyaDropdownOpen, setIsTanyaDropdownOpen] = useState(false);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResourceForModal, setSelectedResourceForModal] = useState<Resource | null>(null);


  const filteredResources = useMemo(() => {
    let filtered = allResources;

    // Filter by search query
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(lowerCaseQuery) ||
          resource.description.toLowerCase().includes(lowerCaseQuery) ||
          (resource.fullContent && resource.fullContent.toLowerCase().includes(lowerCaseQuery)) // Cari juga di fullContent
      );
    }

    // Filter by category
    if (selectedCategory !== "Semua Kategori") {
      filtered = filtered.filter((resource) => resource.type === selectedCategory);
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Handler untuk membuka modal
  const handleLihatSelengkapnyaClick = (resource: Resource) => {
    setSelectedResourceForModal(resource);
    setIsModalOpen(true);
  };

  // Handler untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResourceForModal(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            {/* Sahabat AI text/icon for smaller screens, hidden on md and up */}
            <div className="flex items-center space-x-2 md:hidden">
              <Bot className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-700">Sahabat AI</span>
            </div>
            {/* Main Navigation - Corrected structure and order */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/curhat" className="text-gray-600 hover:text-gray-800 transition-colors">
                Curhat
              </Link>
              <Link href="/tracking" className="text-gray-600 hover:text-gray-800 transition-colors">
                Mood Tracking
              </Link>

              {/* Dropdown 'Tanya' */}
              <div className="relative">
                <button
                  onClick={() => setIsTanyaDropdownOpen(!isTanyaDropdownOpen)}
                  className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none flex items-center"
                >
                  Tanya <span className="ml-1 text-sm">▾</span> {/* Down arrow */}
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
                    <Link href="/Konten" className="text-purple-600 font-semibold transition-colors">
                      Konten
                    </Link>

              {/* Settings Link */}
              <Link href="/settings" className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-1">
                <Settings className="h-5 w-5" />
              </Link>
            </nav>
            {/* Settings icon for smaller screens */}
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Konten</h2>
          <p className="text-gray-600">Temukan artikel, video, podcast, dan panduan untuk mendukung kesejahteraan Anda.</p>
        </div>

        {/* Search and Category Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8 p-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="resource-search" className="block text-sm font-medium text-gray-700 mb-2">Cari Konten</label>
              <div className="relative">
                <Input
                  id="resource-search"
                  placeholder="Cari artikel, video, atau topik..."
                  className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-purple-400 focus:ring-purple-400 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="resource-category-select" className="block text-sm font-medium text-gray-700 mb-2">Filter Kategori</label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger id="resource-category-select" className="w-full sm:min-w-[200px] border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {resourceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Badges for quick filtering */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 mt-4">
            {resourceCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-purple-500 text-white hover:bg-purple-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Resource List */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Daftar Sumber Daya</h3>

          {filteredResources.length === 0 && (
            <p className="text-gray-500 text-center py-8">Tidak ada sumber daya yang cocok dengan kriteria Anda.</p>
          )}

          {filteredResources.map((resource) => (
            <Card key={resource.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 flex items-start space-x-4">
                {/* Optional: Add an image thumbnail here */}
                {resource.image && (
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-24 h-24 object-cover rounded-md flex-shrink-0 hidden sm:block"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600">
                      {resource.title} {/* Link dihilangkan dari judul */}
                    </h3>
                    <Badge className={`${getCategoryColor(resource.type)} flex items-center`}>
                      {getCategoryIcon(resource.type)}
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">{resource.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Estimasi waktu: {resource.timeEstimate}</span>
                  </div>
                  <div className="mt-4">
                    {/* Tombol yang memicu modal */}
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => handleLihatSelengkapnyaClick(resource)}
                    >
                      Lihat Selengkapnya
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer CTA (optional, but good for consistency) */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Butuh Lebih Banyak Bantuan?</h3>
            <p className="mb-6 opacity-90">
              Jelajahi fitur FriendYours lainnya atau tanyakan langsung ke komunitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tanya-teman">
                <Button className="bg-white text-purple-600 hover:bg-gray-100">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Tanya Teman
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

      {/* Render Modal Komponen */}
      <ResourceDetailModal
        resource={selectedResourceForModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}