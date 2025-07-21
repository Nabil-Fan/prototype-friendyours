# FriendYours - AI Mental Health Platform

## 🚀 Perbaikan Terbaru
### ✅ AI Response System yang Diperbaiki
- **Intelligent Response Generator**: AI internal yang tidak bergantung pada external APIs
- **Contextual Understanding**: AI memahami dan menjawab pertanyaan spesifik
- **Topic Extraction**: Mendeteksi topik utama (kerja, kuliah, relationship, keluarga, dll)
- **Question Type Detection**: Membedakan jenis pertanyaan (specific question, seeking advice, sharing problem, expressing feelings)
- **Natural Conversation Flow**: Respons yang natural dan tidak template-based

### 🧠 Enhanced AI Features

#### 1. **Smart Topic Detection**
\`\`\`typescript
// AI mendeteksi topik dari pesan user
const topics = extractTopics(message)
// Topics: work, study, relationship, family, health, finance, social, future
\`\`\`

#### 2. **Question Type Analysis**
\`\`\`typescript
// AI memahami jenis pertanyaan
const questionType = detectQuestionType(message)
// Types: specific_question, seeking_advice, sharing_problem, expressing_feelings
\`\`\`

#### 3. **Contextual Response Generation**
- **Specific Answers**: Jawaban langsung untuk pertanyaan spesifik
- **Advice Responses**: Saran yang actionable dan praktis
- **Empathetic Responses**: Validasi emosi dengan empati tinggi
- **Validation Responses**: Mengakui dan memvalidasi perasaan user

### 💡 Contoh Respons AI yang Diperbaiki

**Sebelum (Template-based):**
\`\`\`
"Aku di sini untukmu. Mau cerita lebih lanjut?"
\`\`\`

**Sesudah (Contextual & Intelligent):**
\`\`\`
"Untuk mengatasi stress kerja, coba beberapa hal ini: 1) Atur prioritas tugas dengan metode Eisenhower Matrix, 2) Ambil break 15 menit setiap 2 jam, 3) Komunikasikan beban kerja dengan atasan jika memang berlebihan. Yang mana yang paling relevan dengan situasi kamu sekarang?"
\`\`\`

### 🎯 Fitur AI yang Bekerja Tanpa External API

#### 1. **Emotion Detection (12+ Emotions)**
- Sangat bahagia, Bahagia, Bersyukur
- Tenang, Bingung, Bosan
- Khawatir, Stres, Burnout
- Sedih, Depresi, Marah

#### 2. **Crisis Detection (3 Levels)**
- **High Risk**: Kata-kata yang mengindikasikan bahaya langsung
- **Medium Risk**: Tanda-tanda putus asa dan hopelessness
- **Low Risk**: Stress dan kesedihan yang perlu perhatian

#### 3. **Personalized Recommendations**
- Berdasarkan konteks spesifik (kerja, kuliah, relationship)
- Actionable tips yang bisa langsung dipraktikkan
- Disesuaikan dengan intensitas emosi

#### 4. **Voice Motivation**
- Motivasi personal yang disesuaikan dengan situasi
- Text-to-speech ready
- Contextual dan tidak generic

### 🔧 Cara Menjalankan

1. **Clone Repository**
\`\`\`bash
git clone <repository-url>
cd sahabatkita-app
\`\`\`

2. **Install Dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Setup Environment (Optional)**
\`\`\`bash
# Buat file .env.local jika ingin menggunakan external AI
HUGGING_FACE_TOKEN="tokenmu"
OLLAMA_URL=http://localhost:11434
\`\`\`

4. **Run Development Server**
\`\`\`bash
npm run dev
\`\`\`

5. **Buka Browser**
\`\`\`
http://localhost:3000
\`\`\`

### 🎨 Fitur Lengkap Platform

#### 🏠 **Homepage**
- Hero section dengan call-to-action
- Feature overview
- Trust & security information

#### 🤖 **AI Chatbot (/curhat)**
- Intelligent conversation flow
- Emotion detection real-time
- Crisis intervention system
- Personalized recommendations
- Voice motivation
- External resource links

#### 📊 **Mood Tracking (/tracking)**
- Weekly mood visualization
- Trend analysis
- Personal insights
- Progress tracking

#### 👥 **Community (/komunitas)**
- Anonymous discussion forum
- Location-based filtering
- Category-based topics
- Peer support system

#### ❓ **Ask Friends (/tanya-teman)**
- Q&A with community
- Anonymous questions
- Voting system
- Expert advice

#### 🚨 **Emergency System**
- Automatic crisis detection
- Emergency hotline integration
- Professional referrals
- Safety protocols

### 🛡️ **Security & Privacy**
- Fully anonymous conversations
- No personal data collection
- Local session management
- HTTPS encryption
- Content moderation

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Cross-browser compatibility

### 🎯 **AI Response Examples**

**User**: "Gimana cara mengatasi stress kerja?"
**AI**: "Untuk mengatasi stress kerja, coba beberapa hal ini: 1) Atur prioritas tugas dengan metode Eisenhower Matrix, 2) Ambil break 15 menit setiap 2 jam, 3) Komunikasikan beban kerja dengan atasan jika memang berlebihan, 4) Praktikkan deep breathing saat merasa overwhelmed. Yang mana yang paling relevan dengan situasi kamu sekarang?"

**User**: "Aku lagi sedih banget karena putus sama pacar"
**AI**: "Putus cinta itu emang sakit banget, apalagi kalau unexpected. Yang penting sekarang: 1) Allow yourself to grieve - crying is okay, 2) Jangan isolasi diri, stay connected dengan support system, 3) Hindari stalking social media ex, 4) Focus pada self-care dan aktivitas yang kamu enjoy. Healing takes time, dan setiap orang beda-beda. Mau cerita lebih detail tentang apa yang terjadi?"

**User**: "Aku burnout di kantor, capek banget"
**AI**: "Burnout kerja itu serius dan butuh penanganan yang tepat. Langkah-langkah yang bisa kamu coba: 1) Evaluasi work-life balance - set boundary yang jelas, 2) Identifikasi aspek kerja yang masih bisa kamu kontrol, 3) Cari support system di kantor atau di luar, 4) Pertimbangkan cuti atau medical leave jika diperlukan. Sudah berapa lama kamu merasa burnout seperti ini?"

### 🚀 **Performance**
- Fast loading dengan Next.js optimization
- Efficient state management
- Optimized images dan assets
- Minimal bundle size
- Progressive loading

### 🔮 **Future Enhancements**
- Voice input/output
- Multi-language support
- Advanced analytics
- Professional integration
- Mobile app version

---

**FriendYours** - Platform kesehatan mental yang benar-benar memahami dan peduli 💙
"# prototype-friendyours" 
