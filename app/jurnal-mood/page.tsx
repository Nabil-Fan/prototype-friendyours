"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, CalendarIcon, Plus, Filter, BarChart3, BookOpen, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface MoodEntry {
  id: string
  date: string
  mood: string
  emoji: string
  intensity: number
  triggers: string[]
  activities: string[]
  notes: string
}

const moodOptions = [
  { emoji: "😊", label: "Senang", color: "bg-green-100 text-green-800" },
  { emoji: "😌", label: "Tenang", color: "bg-blue-100 text-blue-800" },
  { emoji: "😐", label: "Netral", color: "bg-gray-100 text-gray-800" },
  { emoji: "😰", label: "Cemas", color: "bg-yellow-100 text-yellow-800" },
  { emoji: "😢", label: "Sedih", color: "bg-red-100 text-red-800" },
  { emoji: "😤", label: "Kesal", color: "bg-orange-100 text-orange-800" },
]

const triggerOptions = ["Pekerjaan", "Hubungan", "Kesehatan", "Keuangan", "Keluarga", "Akademik", "Sosial", "Lainnya"]

const activityOptions = [
  "Olahraga",
  "Meditasi",
  "Membaca",
  "Musik",
  "Tidur",
  "Makan",
  "Bekerja",
  "Belajar",
  "Bersosialisasi",
]

const mockMoodData = [
  { date: "Sen", mood: 6, fullDate: "2024-01-15" },
  { date: "Sel", mood: 4, fullDate: "2024-01-16" },
  { date: "Rab", mood: 3, fullDate: "2024-01-17" },
  { date: "Kam", mood: 5, fullDate: "2024-01-18" },
  { date: "Jum", mood: 7, fullDate: "2024-01-19" },
  { date: "Sab", mood: 8, fullDate: "2024-01-20" },
  { date: "Min", mood: 6, fullDate: "2024-01-21" },
]

const mockMoodEntries: MoodEntry[] = [
  {
    id: "1",
    date: "2024-01-21",
    mood: "Senang",
    emoji: "😊",
    intensity: 7,
    triggers: ["Pekerjaan"],
    activities: ["Olahraga", "Musik"],
    notes: "Hari ini produktif banget! Berhasil menyelesaikan project besar dan sempat workout.",
  },
  {
    id: "2",
    date: "2024-01-20",
    mood: "Cemas",
    emoji: "😰",
    intensity: 6,
    triggers: ["Akademik", "Keuangan"],
    activities: ["Meditasi"],
    notes: "Deg-degan karena deadline skripsi dan tagihan bulanan. Tapi alhamdulillah bisa tenang setelah meditasi.",
  },
]

export default function JurnalMoodPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authType, setAuthType] = useState<"login"|"register">("login")

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [selectedMood, setSelectedMood] = useState("")
  const [moodIntensity, setMoodIntensity] = useState(5)
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [moodNotes, setMoodNotes] = useState("")
  const [viewMode, setViewMode] = useState<"calendar" | "history" | "chart">("calendar")

  const averageMood = mockMoodData.reduce((sum, day) => sum + day.mood, 0) / mockMoodData.length

  const handleSaveMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate?.toISOString().split("T")[0] || new Date().toISOString().split("T")[0],
      mood: selectedMood,
      emoji: moodOptions.find((m) => m.label === selectedMood)?.emoji || "😐",
      intensity: moodIntensity,
      triggers: selectedTriggers,
      activities: selectedActivities,
      notes: moodNotes,
    }

    console.log("Saving mood entry:", newEntry)

    // Reset form
    setShowNewEntry(false)
    setSelectedMood("")
    setMoodIntensity(5)
    setSelectedTriggers([])
    setSelectedActivities([])
    setMoodNotes("")
  }

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) => (prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger]))
  }

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity],
    )
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Jurnal Mood</h2>
          <p className="text-gray-600">
            Catat dan pantau perubahan suasana hati untuk memahami pola emosi dan kesehatan mental
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            onClick={() => setViewMode("calendar")}
            className="flex items-center space-x-2"
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Kalender</span>
          </Button>
          <Button
            variant={viewMode === "chart" ? "default" : "outline"}
            onClick={() => setViewMode("chart")}
            className="flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Grafik</span>
          </Button>
          <Button
            variant={viewMode === "history" ? "default" : "outline"}
            onClick={() => setViewMode("history")}
            className="flex items-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>Riwayat</span>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar View */}
            {viewMode === "calendar" && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Kalender Mood</span>
                    <Button
                      onClick={() => setShowNewEntry(true)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Catat Mood
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            )}

            {/* Chart View */}
            {viewMode === "chart" && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Grafik Perubahan Mood Mingguan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockMoodData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                        <YAxis domain={[0, 10]} stroke="#6B7280" fontSize={12} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-3 rounded-lg shadow-lg border">
                                  <p className="font-semibold">{label}</p>
                                  <p className="text-purple-600">Mood: {payload[0].value}/10</p>
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
                          dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, fill: "#7C3AED" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* History View */}
            {viewMode === "history" && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Riwayat Jurnal Mood</span>
                    <Select defaultValue="semua">
                      <SelectTrigger className="w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semua">Semua Mood</SelectItem>
                        <SelectItem value="senang">Senang</SelectItem>
                        <SelectItem value="sedih">Sedih</SelectItem>
                        <SelectItem value="cemas">Cemas</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMoodEntries.map((entry) => (
                      <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{entry.emoji}</span>
                            <div>
                              <h4 className="font-medium">{entry.mood}</h4>
                              <p className="text-sm text-gray-500">{entry.date}</p>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">{entry.intensity}/10</Badge>
                        </div>

                        {entry.triggers.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Pemicu:</p>
                            <div className="flex flex-wrap gap-1">
                              {entry.triggers.map((trigger, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {trigger}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {entry.activities.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Aktivitas:</p>
                            <div className="flex flex-wrap gap-1">
                              {entry.activities.map((activity, index) => (
                                <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {entry.notes && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Catatan:</p>
                            <p className="text-sm text-gray-600 italic">"{entry.notes}"</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* New Mood Entry Form */}
            {showNewEntry && (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Catat Mood Hari Ini</CardTitle>
                  <p className="text-sm text-gray-600">
                    {selectedDate?.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mood Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Bagaimana perasaanmu hari ini?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.label}
                          onClick={() => setSelectedMood(mood.label)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedMood === mood.label
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-2">{mood.emoji}</div>
                          <div className="text-sm font-medium">{mood.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intensity Slider */}
                  {selectedMood && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Seberapa intens? ({moodIntensity}/10)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={moodIntensity}
                        onChange={(e) => setMoodIntensity(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Ringan</span>
                        <span>Sangat Intens</span>
                      </div>
                    </div>
                  )}

                  {/* Triggers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Apa yang memicu perasaan ini? (opsional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {triggerOptions.map((trigger) => (
                        <button
                          key={trigger}
                          onClick={() => toggleTrigger(trigger)}
                          className={`px-3 py-1 rounded-full text-sm border transition-all ${
                            selectedTriggers.includes(trigger)
                              ? "bg-red-100 text-red-800 border-red-300"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          {trigger}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Aktivitas apa yang kamu lakukan? (opsional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {activityOptions.map((activity) => (
                        <button
                          key={activity}
                          onClick={() => toggleActivity(activity)}
                          className={`px-3 py-1 rounded-full text-sm border transition-all ${
                            selectedActivities.includes(activity)
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          {activity}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Catatan tambahan (opsional)</label>
                    <Textarea
                      placeholder="Ceritakan lebih detail tentang hari ini..."
                      value={moodNotes}
                      onChange={(e) => setMoodNotes(e.target.value)}
                      className="min-h-24"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowNewEntry(false)}>
                      Batal
                    </Button>
                    <Button
                      onClick={handleSaveMoodEntry}
                      disabled={!selectedMood}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      Simpan Jurnal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{averageMood.toFixed(1)}/10</div>
                <p className="text-gray-600 mb-2">Rata-rata Mood Minggu Ini</p>
                <Badge className="bg-purple-100 text-purple-800">
                  {averageMood >= 7 ? "Baik" : averageMood >= 5 ? "Netral" : "Perlu Perhatian"}
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
                  <span className="text-gray-600">Mood Dominan</span>
                  <Badge className="bg-blue-100 text-blue-800">Tenang</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Streak Jurnal</span>
                  <Badge className="bg-purple-100 text-purple-800">7 hari</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Insight Mingguan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Mood kamu cenderung lebih baik di akhir pekan. Mungkin karena lebih rileks?
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✨ Olahraga dan musik tampaknya membantu meningkatkan mood kamu!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
