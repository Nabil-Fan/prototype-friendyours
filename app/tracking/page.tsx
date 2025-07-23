"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import { MessageCircle, ThumbsUp, MapPin, Users, Clock, Eye, Send, Search, Sparkle, CheckCircle, ArrowLeft, Bot, Settings, Heart, TrendingUp, Calendar as CalendarIcon, BarChart3, Smile, Frown, Meh, Annoyed, Angry, ListFilter, CalendarDays, Book, ChevronLeft, ChevronRight, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const moodData = [
  { day: "Sen", mood: 6, date: "18 Nov" },
  { day: "Sel", mood: 4, date: "19 Nov" },
  { day: "Rab", mood: 3, date: "20 Nov" },
  { day: "Kam", mood: 5, date: "21 Nov" },
  { day: "Jum", mood: 7, date: "22 Nov" },
  { day: "Sab", mood: 8, date: "23 Nov" },
  { day: "Min", mood: 6, date: "24 Nov" },
]

// Data dummy untuk Riwayat Jurnal (dengan tahun 2025 agar sesuai dengan konteks waktu)
const journalEntries = [
  {
    id: "1",
    date: "2025-11-22", // Format YYYY-MM-DD untuk kemudahan parsing
    moodType: "senang",
    moodRating: 7,
    trigger: "Berhasil menyelesaikan proyek besar",
    note: "Sangat lega dan bahagia setelah proyek selesai tepat waktu. Merasa produktif.",
  },
  {
    id: "2",
    date: "2025-11-20",
    moodType: "sedih",
    moodRating: 3,
    trigger: "Bertengkar dengan teman",
    note: "Ada salah paham dengan teman baik. Merasa sedikit down sepanjang hari.",
  },
  {
    id: "3",
    date: "2025-11-19",
    moodType: "netral",
    moodRating: 5,
    trigger: "Rutinitas harian",
    note: "Hari yang cukup biasa, tidak ada yang menonjol. Fokus pada pekerjaan.",
  },
  {
    id: "4",
    date: "2025-11-18",
    moodType: "cemas",
    moodRating: 4,
    trigger: "Presentasi besok",
    note: "Agak gugup memikirkan presentasi besok di kantor. Sudah mempersiapkan diri, tapi tetap saja ada rasa cemas.",
  },
  {
    id: "5",
    date: "2025-12-05", // Contoh entri bulan lain
    moodType: "bahagia",
    moodRating: 8,
    trigger: "Liburan keluarga",
    note: "Sangat senang bisa berkumpul dengan keluarga besar.",
  },
  {
    id: "6",
    date: "2025-10-15", // Contoh entri bulan lain
    moodType: "marah",
    moodRating: 2,
    trigger: "Masalah teknis di kantor",
    note: "Komputer crash saat deadline, sangat frustasi.",
  },
];


const weeklyInsights = [
  {
    title: "Penurunan Energi",
    description: "Kamu tampaknya mengalami penurunan energi selama 3 hari terakhir.",
    type: "warning",
    icon: TrendingUp,
  },
  {
    title: "Pola Tidur",
    description: "Mood terbaikmu cenderung di akhir pekan. Mungkin karena lebih rileks?",
    type: "info",
    icon: CalendarIcon, // Changed to CalendarIcon to avoid conflict with Calendar component name
  },
  {
    title: "Progress Positif",
    description: "Secara keseluruhan, ada tren peningkatan dari minggu lalu!",
    type: "success",
    icon: BarChart3,
  },
]

export default function TrackingPage() {
  const [selectedMoodType, setSelectedMoodType] = useState("")
  const [moodTrigger, setMoodTrigger] = useState("")
  const [moodNote, setMoodNote] = useState("")

  // State untuk filter Riwayat Jurnal
  const [filterDate, setFilterDate] = useState("")
  const [filterMood, setFilterMood] = useState("")

  // State untuk kalender mood
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1)); // Default ke November 2025
  const [selectedCalendarEntry, setSelectedCalendarEntry] = useState<typeof journalEntries[0] | null>(null); // State untuk entri kalender yang dipilih

  // State untuk kontrol dropdown "Tanya"
  const [isTanyaDropdownOpen, setIsTanyaDropdownOpen] = useState(false);


  const getMoodColor = (mood: number) => {
    if (mood >= 7) return "#10B981" // Green - Happy
    if (mood >= 5) return "#F59E0B" // Orange - Neutral
    if (mood >= 3) return "#EF4444" // Red - Sad
    return "#6B7280" // Gray - Very low
  }

  const getMoodTypeColor = (moodType: string, isText: boolean = false) => {
    const colors = {
      senang: isText ? 'text-green-500' : 'bg-green-500',
      netral: isText ? 'text-yellow-500' : 'bg-yellow-500',
      sedih: isText ? 'text-red-500' : 'bg-red-500',
      cemas: isText ? 'text-orange-500' : 'bg-orange-500',
      marah: isText ? 'text-purple-500' : 'bg-purple-500',
      bahagia: isText ? 'text-green-500' : 'bg-green-500', // Tambahan untuk data dummy
    };
    return colors[moodType as keyof typeof colors] || (isText ? 'text-gray-500' : 'bg-gray-400');
  }

  const getMoodLabel = (mood: number) => {
    if (mood >= 8) return "Sangat Bahagia"
    if (mood >= 6) return "Bahagia"
    if (mood >= 4) return "Netral"
    if (mood >= 2) return "Sedih"
    return "Sangat Sedih"
  }

  const getMoodTypeLabel = (moodType: string) => {
    switch (moodType) {
      case 'senang': return 'Senang';
      case 'netral': return 'Netral';
      case 'sedih': return 'Sedih';
      case 'cemas': return 'Cemas';
      case 'marah': return 'Marah';
      case 'bahagia': return 'Bahagia';
      default: return '';
    }
  }

  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length

  const router = useRouter()

  const handleSubmitMood = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry = {
      id: String(journalEntries.length + 1),
      date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD
      moodType: selectedMoodType,
      moodRating: 5, // Default rating since no slider
      trigger: moodTrigger,
      note: moodNote,
    };
    // Tambahkan ke data dummy (ini akan langsung mempengaruhi kalender dan daftar riwayat)
    journalEntries.push(newEntry);
    console.log("Mood Submitted:", newEntry);

    setSelectedMoodType("")
    setMoodTrigger("")
    setMoodNote("")
    alert("Mood Anda telah dicatat!");
  }

  const applyJournalFilters = () => {
    console.log("Applying filters:", { filterDate, filterMood });
    alert(`Filter applied: Date='${filterDate}', Mood='${filterMood}'`);
    // Di aplikasi nyata, Anda akan memfilter 'journalEntries' berdasarkan 'filterDate' dan 'filterMood'
    // dan memperbarui state daftar yang ditampilkan.
  }

  // --- Logika Kalender Mood ---
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month); // 0 = Minggu, 1 = Senin, dst.

    const days = [];
    // Tambahkan placeholder untuk hari-hari sebelum tanggal 1
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Tambahkan hari-hari dalam bulan
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }
    return days;
  }, [currentMonth]);

  const getMoodForDate = (day: number | null) => {
    if (day === null) return null;
    const formattedDate = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return journalEntries.find(entry => entry.date === formattedDate);
  };

  const handleDayClick = (day: number | null) => {
    const entry = getMoodForDate(day);
    if (entry) {
      setSelectedCalendarEntry(entry);
    } else {
      setSelectedCalendarEntry(null); // Clear selection if no entry or clicking empty day
    }
  };

  const goToPreviousMonth = () => {
    setSelectedCalendarEntry(null); // Clear selection when changing month
    setCurrentMonth(prevMonth => {
      const newDate = new Date(prevMonth);
      newDate.setMonth(prevMonth.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setSelectedCalendarEntry(null);
    setCurrentMonth(prevMonth => {
      const newDate = new Date(prevMonth);
      newDate.setMonth(prevMonth.getMonth() + 1);
      return newDate;
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
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
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/curhat" className="text-gray-600 hover:text-gray-800 transition-colors">
                Curhat
              </Link>
              <Link href="/tracking" className="text-purple-600 font-semibold transition-colors">
                Mood Tracking
              </Link>

              {/* Dropdown 'Tanya' yang sudah diperbaiki */}
              <div className="relative">
                <button
                  onClick={() => setIsTanyaDropdownOpen(!isTanyaDropdownOpen)}
                  className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none flex items-center"
                >
                  Tanya <span className="ml-1 text-sm">&#9662;</span> {/* Down arrow */}
                </button>

                {isTanyaDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {/* Menggunakan href yang benar untuk routing Next.js App Router */}
                    <Link href="/komunitas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsTanyaDropdownOpen(false)}>
                      Tanya Komunitas
                    </Link>
                    <Link href="/tanya-teman" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsTanyaDropdownOpen(false)}>
                      Tanya Temen
                    </Link>
                    <Link href="/tanya-psikolog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsTanyaDropdownOpen(false)}>
                      Tanya Psikolog
                    </Link>
                  </div>
                )}
              </div>
                    <Link href="/konten" className="text-gray-600 hover:text-gray-800 transition-colors">
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Emotion Tracking</h2>
          <p className="text-gray-600">
            Pantau perkembangan suasana hatimu dan dapatkan insight untuk kesehatan mentalmu
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart - Visualisasi Data Mood: Grafik Perubahan Mood (Mingguan) */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                  <span>Grafik Mood Mingguan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                      <YAxis domain={[0, 10]} stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 rounded-lg shadow-lg border">
                                <p className="font-semibold">{`${label}, ${data.date}`}</p>
                                <p className="text-purple-600">
                                  Mood: {payload[0].value}/10 - {getMoodLabel(payload[0].value as number)}
                                </p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={({ cx, cy, stroke, key, value }) => (
                          <circle
                            key={key}
                            cx={cx}
                            cy={cy}
                            r={6}
                            fill={getMoodColor(value as number)}
                            stroke={getMoodColor(value as number)}
                            strokeWidth={2}
                          />
                        )}
                        activeDot={{ r: 8, fill: "#7C3AED", stroke: "#7C3AED" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Mood Legend */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Bahagia (7-10)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-600">Netral (4-6)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-600">Cemas (2-3)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Sedih (0-1)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar - Ringkasan Mood Rata-rata */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{averageMood.toFixed(1)}/10</div>
                <p className="text-gray-600 mb-2">Rata-rata Mood Minggu Ini</p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {getMoodLabel(averageMood)}
                </Badge>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Statistik Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hari Terbaik</span>
                  <Badge className="bg-green-100 text-green-800">Sabtu (8/10)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hari Tersulit</span>
                  <Badge className="bg-red-100 text-red-800">Rabu (3/10)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tren</span>
                  <Badge className="bg-blue-100 text-blue-800">Naik Turun</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section: Catat Mood Harian */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkle className="h-6 w-6 text-pink-500" />
              <span>Catat Mood Harianmu</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitMood} className="space-y-4">
              <div>
                <label htmlFor="mood-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Pilih Moodmu Hari Ini:
                </label>
                <Select value={selectedMoodType} onValueChange={setSelectedMoodType}>
                  <SelectTrigger id="mood-select" className="w-full">
                    <SelectValue placeholder="Pilih mood..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senang">
                      <div className="flex items-center space-x-2">
                        <Smile className="h-4 w-4 text-green-500" />
                        <span>Senang / Bahagia</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="netral">
                      <div className="flex items-center space-x-2">
                        <Meh className="h-4 w-4 text-yellow-500" />
                        <span>Netral</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sedih">
                      <div className="flex items-center space-x-2">
                        <Frown className="h-4 w-4 text-red-500" />
                        <span>Sedih</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="cemas">
                      <div className="flex items-center space-x-2">
                        <Annoyed className="h-4 w-4 text-orange-500" />
                        <span>Cemas</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="marah">
                      <div className="flex items-center space-x-2">
                        <Angry className="h-4 w-4 text-purple-500" />
                        <span>Marah</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="mood-trigger" className="block text-sm font-medium text-gray-700 mb-1">
                  Pilihan Detail Tambahan (misal: pemicu mood, aktivitas):
                </label>
                <Input
                  id="mood-trigger"
                  placeholder="Contoh: Pekerjaan, Teman, Keluarga, Olahraga"
                  value={moodTrigger}
                  onChange={(e) => setMoodTrigger(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="mood-note" className="block text-sm font-medium text-gray-700 mb-1">
                  Kolom Teks untuk Catatan Bebas:
                </label>
                <Textarea
                  id="mood-note"
                  placeholder="Ceritakan lebih lanjut tentang harimu..."
                  rows={4}
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2">
                <CheckCircle className="h-5 w-5 mr-2" />
                Catat Mood
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Section: Kalender Mood (tampilan bulanan/mingguan) */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarDays className="h-6 w-6 text-blue-500" />
              <span>Kalender Mood</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-lg font-semibold text-gray-800">
                {currentMonth.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
              </h3>
              <Button variant="ghost" size="icon" onClick={goToNextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                <div key={day} className="py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map((day, index) => {
                const moodEntry = getMoodForDate(day);
                const isSelected = selectedCalendarEntry && moodEntry && selectedCalendarEntry.id === moodEntry.id;
                return (
                  <div
                    key={index}
                    className={`p-2 rounded-md flex flex-col items-center justify-center h-16 transition-all duration-200
                      ${day === null ? 'bg-gray-50' : 'bg-gray-100 cursor-pointer'}
                      ${moodEntry ? 'border-2 border-purple-400' : ''}
                      ${isSelected ? 'bg-purple-200 border-purple-600 shadow-md' : 'hover:bg-gray-200'}
                    `}
                    onClick={() => handleDayClick(day)}
                  >
                    <span className="font-bold text-gray-800">{day}</span>
                    {moodEntry && (
                      <div className={`w-4 h-4 rounded-full mt-1 ${getMoodTypeColor(moodEntry.moodType)}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Kotak dengan border ungu dan titik berwarna menunjukkan mood yang dicatat pada hari tersebut. Klik pada tanggal untuk melihat detail.
            </p>

            {/* Detail Catatan Mood yang Dipilih */}
            {selectedCalendarEntry && (
              <Card className="mt-6 p-4 bg-white border shadow-md relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setSelectedCalendarEntry(null)}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Detail Mood: {new Date(selectedCalendarEntry.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-700">Jenis Mood:</span>
                  <Badge className={`px-2 py-1 text-sm font-medium ${getMoodTypeColor(selectedCalendarEntry.moodType)} text-white`}>
                    {getMoodTypeLabel(selectedCalendarEntry.moodType)} ({selectedCalendarEntry.moodRating}/10)
                  </Badge>
                </div>
                {selectedCalendarEntry.trigger && (
                  <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Pemicu:</span> {selectedCalendarEntry.trigger}
                  </p>
                )}
                <p className="text-gray-700">
                  <span className="font-semibold">Catatan:</span> {selectedCalendarEntry.note}
                </p>
              </Card>
            )}
          </CardContent>
        </Card>


        {/* Section: Riwayat Jurnal (Tampilan Daftar Catatan Mood & Filter Tanggal/Mood) */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-green-500" />
              <span>Riwayat Jurnal Mood</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="filter-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter Tanggal:
                </label>
                <Input
                  id="filter-date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="filter-mood" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter Mood:
                </label>
                <Select value={filterMood} onValueChange={setFilterMood}>
                  <SelectTrigger id="filter-mood" className="w-full">
                    <SelectValue placeholder="Semua Mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Mood</SelectItem>
                    <SelectItem value="senang">Senang</SelectItem>
                    <SelectItem value="netral">Netral</SelectItem>
                    <SelectItem value="sedih">Sedih</SelectItem>
                    <SelectItem value="cemas">Cemas</SelectItem>
                    <SelectItem value="marah">Marah</SelectItem>
                    <SelectItem value="bahagia">Bahagia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={applyJournalFilters} className="mt-auto bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0">
                <ListFilter className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </div>

            {/* Tampilan Daftar Catatan Mood */}
            {journalEntries.length > 0 ? (
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <Card key={entry.id} className="p-4 border-l-4 border-purple-400 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-600">{new Date(entry.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <Badge className={`px-2 py-1 text-xs font-medium ${getMoodTypeColor(entry.moodType)} text-white`}>
                        {getMoodTypeLabel(entry.moodType)} ({entry.moodRating}/10)
                      </Badge>
                    </div>
                    {entry.trigger && (
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">Pemicu:</span> {entry.trigger}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 line-clamp-2">
                      <span className="font-medium">Catatan:</span> {entry.note}
                    </p>
                    <Button variant="link" size="sm" className="px-0 pt-2 text-purple-600 hover:text-purple-800">Baca Selengkapnya</Button>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Belum ada catatan jurnal. Mulai catat moodmu!</p>
            )}
          </CardContent>
        </Card>


        {/* Weekly Insights */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Insight Mingguan</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {weeklyInsights.map((insight, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-full ${
                        insight.type === "warning"
                          ? "bg-orange-100"
                          : insight.type === "success"
                            ? "bg-green-100"
                            : "bg-blue-100"
                      }`}
                    >
                      <insight.icon
                        className={`h-6 w-6 ${
                          insight.type === "warning"
                            ? "text-orange-600"
                            : insight.type === "success"
                              ? "text-green-600"
                              : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{insight.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Butuh Berbicara dengan Seseorang?</h3>
            <p className="mb-6 opacity-90">
              Jika kamu merasa perlu dukungan lebih, jangan ragu untuk curhat atau terhubung dengan komunitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/curhat">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Mulai Curhat
                </button>
              </Link>
              <Link href="/komunitas">
                <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                  Gabung Komunitas
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}