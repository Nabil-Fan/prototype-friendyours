"use server"

import { type NextRequest, NextResponse } from "next/server"

interface ChatRequest {
  message: string
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
}

interface EmotionAnalysis {
  emotion: string
  category: "positive" | "neutral" | "negative"
  keywords: string[]
}

interface CrisisDetection {
  isEmergency: boolean
  riskLevel: "low" | "medium" | "high"
  keywords: string[]
}

// Crisis detection keywords
const CRISIS_KEYWORDS = {
  high: [
    "bunuh diri",
    "suicide",
    "mau mati",
    "ingin mati",
    "mengakhiri hidup",
    "tidak ingin hidup",
    "lebih baik mati",
    "gantung diri",
    "loncat dari",
    "overdosis",
    "akhiri saja",
  ],
  medium: [
    "capek hidup",
    "tidak ada harapan",
    "putus asa",
    "ingin menghilang",
    "tidak berguna",
    "beban",
    "hampa",
    "lelah hidup",
    "menyerah",
  ],
  low: ["sedih banget", "depresi", "down", "stress berat", "overwhelmed", "burnout", "frustasi", "hopeless"],
}

// Simple emotion detection
function analyzeEmotion(text: string): EmotionAnalysis {
  const lowerText = text.toLowerCase()

  const emotionKeywords = {
    bahagia: ["senang", "bahagia", "gembira", "excited", "antusias", "semangat"],
    tenang: ["tenang", "damai", "rileks", "santai", "calm"],
    bingung: ["bingung", "confused", "tidak tahu", "ragu", "dilema"],
    bosan: ["bosan", "jenuh", "monoton", "boring"],
    khawatir: ["khawatir", "cemas", "worry", "anxious", "takut", "nervous", "deg-degan"],
    stres: ["stres", "stress", "tertekan", "overwhelmed", "kewalahan"],
    burnout: ["burnout", "kelelahan", "capek banget", "exhausted", "drained"],
    sedih: ["sedih", "down", "galau", "kecewa", "patah hati", "terpuruk", "gagal"],
    marah: ["marah", "kesal", "angry", "frustrated", "jengkel", "sebel"],
  }

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const matchedKeywords = keywords.filter((keyword) => lowerText.includes(keyword))
    if (matchedKeywords.length > 0) {
      const category = ["bahagia"].includes(emotion)
        ? "positive"
        : ["tenang", "bingung", "bosan"].includes(emotion)
          ? "neutral"
          : "negative"

      return { emotion, category, keywords: matchedKeywords }
    }
  }

  return { emotion: "netral", category: "neutral", keywords: [] }
}

// Crisis detection
function detectCrisis(text: string): CrisisDetection {
  const lowerText = text.toLowerCase()
  let detectedKeywords: string[] = []
  let riskLevel: "low" | "medium" | "high" = "low"

  for (const [level, keywords] of Object.entries(CRISIS_KEYWORDS)) {
    const foundKeywords = keywords.filter((keyword) => lowerText.includes(keyword))
    if (foundKeywords.length > 0) {
      detectedKeywords = [...detectedKeywords, ...foundKeywords]
      riskLevel = level as "low" | "medium" | "high"
      break
    }
  }

  return {
    isEmergency: riskLevel === "high",
    riskLevel,
    keywords: detectedKeywords,
  }
}

// Generate AI response pake OpenChat-3.5
async function generateAIResponse(
  userMessage: string,
  emotionAnalysis: EmotionAnalysis,
  conversationHistory: Array<{ role: string; content: string }>,
): Promise<string> {
  try {
    // Prepare conversation context for OpenChat
    const systemPrompt = `Kamu adalah Sahabat AI yang empatik dan supportif untuk platform kesehatan mental SAHABATKITA. Kamu membantu mahasiswa dan pekerja Indonesia yang mengalami stress, anxiety, depresi, dan masalah mental health lainnya.

Karakteristik kamu:
- Empati tinggi dan non-judgmental
- Menggunakan bahasa Indonesia yang natural dan hangat
- Memberikan validasi emosi dan support
- Memberikan advice praktis ketika diperlukan
- Tidak menggurui atau terkesan seperti robot
- Conversational dan personal
- Memahami konteks budaya Indonesia

Emosi yang terdeteksi dari user: ${emotionAnalysis.emotion} (${emotionAnalysis.category})

Berikan response yang natural, empati, dan helpful. Jangan terlalu panjang (maksimal 3-4 kalimat). Fokus pada understanding dan support.`

    // Build conversation history for context
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-4), // Last 4 messages for context
      { role: "user", content: userMessage },
    ]

    // Try Hugging Face first
    if (process.env.HUGGING_FACE_TOKEN) {
      const response = await fetch("https://api-inference.huggingface.co/models/openchat/openchat-3.5-0106", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n\n"),
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        let aiResponse = data[0]?.generated_text || ""

        // Clean up the response
        aiResponse = aiResponse.replace(/^(system:|user:|assistant:)/gim, "").trim()
        aiResponse = aiResponse.split("\n\n")[0] // Take first paragraph
        aiResponse = aiResponse.replace(/^\w+:\s*/, "") // Remove role prefixes

        if (aiResponse && aiResponse.length > 10) {
          return aiResponse
        }
      }
    }

    // Try Ollama as fallback
    if (process.env.OLLAMA_URL) {
      const response = await fetch(`${process.env.OLLAMA_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openchat:3.5",
          prompt: messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n\n"),
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 200,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        let aiResponse = data.response || ""

        // Clean up the response
        aiResponse = aiResponse.replace(/^(system:|user:|assistant:)/gim, "").trim()
        aiResponse = aiResponse.split("\n\n")[0]
        aiResponse = aiResponse.replace(/^\w+:\s*/, "")

        if (aiResponse && aiResponse.length > 10) {
          return aiResponse
        }
      }
    }

    // Fallback response if AI services fail
    return generateFallbackResponse(userMessage, emotionAnalysis)
  } catch (error) {
    console.error("AI Generation Error:", error)
    return generateFallbackResponse(userMessage, emotionAnalysis)
  }
}

// Simple fallback when AI services are unavailable
function generateFallbackResponse(userMessage: string, emotionAnalysis: EmotionAnalysis): string {
  const message = userMessage.toLowerCase()

  // Basic contextual responses without templates
  if (message.includes("ujian") && message.includes("takut")) {
    return "Exam anxiety itu sangat normal. Kamu udah belajar, itu artinya kamu udah prepare. Sekarang focus pada teknik relaksasi untuk manage anxiety-nya."
  }

  if (message.includes("gagal") && message.includes("capek")) {
    return "Perasaan gagal itu berat banget ya. Tapi ingat, kegagalan itu bukan identitas kamu. Kamu udah berjuang keras, dan itu patut diapresiasi."
  }

  if (message.includes("tidak bisa tidur") && message.includes("kepikiran")) {
    return "Overthinking yang bikin susah tidur itu exhausting banget. Hal-hal yang terasa besar di malam hari biasanya karena kita process-nya saat tired dan vulnerable."
  }

  if (emotionAnalysis.category === "negative") {
    return "Aku bisa ngerasain struggle yang kamu alami. Mau cerita lebih detail tentang apa yang bikin kamu merasa seperti ini?"
  }

  return "Aku di sini untuk mendengarkan ceritamu. Apa yang lagi ada di pikiran kamu?"
}

// Determine if recommendations are needed
function shouldProvideRecommendations(message: string, emotion: string): boolean {
  const lowerMessage = message.toLowerCase()

  return (
    lowerMessage.includes("gimana") ||
    lowerMessage.includes("cara") ||
    lowerMessage.includes("saran") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("bantu") ||
    emotion === "stres" ||
    emotion === "burnout" ||
    emotion === "khawatir" ||
    lowerMessage.includes("ujian") ||
    lowerMessage.includes("tidak bisa tidur")
  )
}

// Generate contextual recommendations using AI
async function generateRecommendations(message: string, emotion: string): Promise<string[]> {
  if (!shouldProvideRecommendations(message, emotion)) {
    return []
  }

  const lowerMessage = message.toLowerCase()
  const recommendations: string[] = []

  // Exam anxiety
  if (lowerMessage.includes("ujian") || lowerMessage.includes("exam")) {
    recommendations.push("Praktikkan teknik pernapasan 4-7-8 untuk menenangkan diri")
    recommendations.push("Review materi secara ringan, hindari cramming")
    recommendations.push("Siapkan semua keperluan ujian dari malam sebelumnya")
    recommendations.push("Pastikan tidur cukup sebelum ujian")
  }

  // Sleep problems
  else if (lowerMessage.includes("tidak bisa tidur") || lowerMessage.includes("insomnia")) {
    recommendations.push("Set 'worry time' 15 menit di siang hari untuk overthinking")
    recommendations.push("Praktikkan progressive muscle relaxation sebelum tidur")
    recommendations.push("Hindari screen 1 jam sebelum tidur")
    recommendations.push("Jika tidak bisa tidur dalam 20 menit, bangun dan lakukan aktivitas tenang")
  }

  // Work stress
  else if (lowerMessage.includes("kerja") || lowerMessage.includes("kantor")) {
    recommendations.push("Komunikasikan workload dengan atasan secara objektif")
    recommendations.push("Set boundary yang jelas antara work time dan personal time")
    recommendations.push("Ambil break 15 menit setiap 2 jam kerja")
  }

  // General stress/anxiety
  else if (emotion === "stres" || emotion === "khawatir") {
    recommendations.push("Coba teknik grounding 5-4-3-2-1 saat merasa overwhelmed")
    recommendations.push("Buat list prioritas untuk organize thoughts dan tasks")
    recommendations.push("Lakukan aktivitas fisik ringan untuk release tension")
  }

  // Self-worth issues
  else if (lowerMessage.includes("gagal") || lowerMessage.includes("tidak berguna")) {
    recommendations.push("Tulis 3 hal positif yang berhasil kamu lakukan hari ini")
    recommendations.push("Practice self-compassion: bicara ke diri sendiri seperti ke sahabat baik")
    recommendations.push("Identifikasi satu lesson learned dari setiap experience")
  }

  return recommendations.slice(0, 4) // Maximum 4 recommendations
}

// Determine if voice motivation is needed
function shouldProvideVoiceMotivation(message: string, emotion: string, crisisDetection: CrisisDetection): boolean {
  const lowerMessage = message.toLowerCase()

  return (
    crisisDetection.riskLevel === "medium" ||
    crisisDetection.riskLevel === "high" ||
    emotion === "sedih" ||
    emotion === "burnout" ||
    lowerMessage.includes("putus asa") ||
    lowerMessage.includes("menyerah") ||
    lowerMessage.includes("capek hidup") ||
    lowerMessage.includes("tidak berguna")
  )
}

// Generate voice motivation
function generateVoiceMotivation(message: string, emotion: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("ujian") && lowerMessage.includes("takut")) {
    return "Kamu sudah mempersiapkan diri dengan belajar. Percaya pada kemampuan yang sudah kamu bangun. Satu soal dalam satu waktu, kamu pasti bisa."
  }

  if (lowerMessage.includes("gagal") || lowerMessage.includes("tidak berguna")) {
    return "Kegagalan bukan akhir dari segalanya, tapi awal dari pembelajaran baru. Kamu berharga dan memiliki potensi yang luar biasa."
  }

  if (lowerMessage.includes("tidak bisa tidur")) {
    return "Pikiran yang berputar di malam hari akan terasa lebih ringan di pagi hari. Berikan waktu untuk tubuh dan pikiran beristirahat."
  }

  if (emotion === "sedih") {
    return "Kesedihan yang kamu rasakan menunjukkan bahwa kamu memiliki hati yang dalam. Perasaan ini akan berlalu, dan kamu akan menjadi lebih kuat."
  }

  if (emotion === "burnout") {
    return "Kelelahan yang kamu rasakan adalah bukti bahwa kamu sudah berjuang keras. Sekarang saatnya untuk memberikan kasih sayang pada diri sendiri."
  }

  return "Kamu tidak sendirian dalam perjuangan ini. Setiap langkah kecil yang kamu ambil adalah kemajuan yang berarti."
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, conversationHistory } = body

    console.log("Processing message:", message)

    // Analyze emotion and crisis
    const emotionAnalysis = analyzeEmotion(message)
    const crisisDetection = detectCrisis(message)

    // Generate AI response using OpenChat-3.5
    const aiResponse = await generateAIResponse(message, emotionAnalysis, conversationHistory)

    // Generate recommendations only when needed
    const recommendations = await generateRecommendations(message, emotionAnalysis.emotion)

    // Generate voice motivation only when needed
    const voiceMotivation = shouldProvideVoiceMotivation(message, emotionAnalysis.emotion, crisisDetection)
      ? generateVoiceMotivation(message, emotionAnalysis.emotion)
      : ""

    return NextResponse.json({
      response: aiResponse,
      emotion: emotionAnalysis,
      crisis: crisisDetection,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      voiceMotivation: voiceMotivation || undefined,
      externalLinks: [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json(
      {
        error: "Ada gangguan teknis sebentar",
        response: "Maaf ada kendala teknis. Tapi aku tetap di sini untukmu. Coba cerita lagi ya?",
      },
      { status: 500 },
    )
  }
}
