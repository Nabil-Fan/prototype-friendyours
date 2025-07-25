"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, TrendingUp, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
    icon: Calendar,
  },
  {
    title: "Progress Positif",
    description: "Secara keseluruhan, ada tren peningkatan dari minggu lalu!",
    type: "success",
    icon: BarChart3,
  },
]

export default function TrackingPage() {
  
  const getMoodColor = (mood: number) => {
    if (mood >= 7) return "#10B981" // Green - Happy
    if (mood >= 5) return "#F59E0B" // Orange - Neutral
    if (mood >= 3) return "#EF4444" // Red - Sad
    return "#6B7280" // Gray - Very low
  }

  const getMoodLabel = (mood: number) => {
    if (mood >= 8) return "Sangat Bahagia"
    if (mood >= 6) return "Bahagia"
    if (mood >= 4) return "Netral"
    if (mood >= 2) return "Sedih"
    return "Sangat Sedih"
  }

  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length

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
              <Link href="/komunitas" className="text-gray-600 hover:text-gray-800 transition-colors">
                Komunitas
              </Link>
              <Link href="/tanya-teman" className="text-gray-600 hover:text-gray-800 transition-colors">
                Tanya Teman
              </Link>
            </nav>
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
          {/* Main Chart */}
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
                        dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, fill: "#7C3AED" }}
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

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Average Mood */}
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
