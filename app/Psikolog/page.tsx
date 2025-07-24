"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Users, Calendar } from "lucide-react";

const filters = [
	"Depresi",
	"Kecemasan",
	"Burnout",
	"Kelelahan",
];

// Tambahkan beberapa data psikolog
const psikologList = [
	{
		foto: "/avatar-psikolog.png",
		nama: "dr. Andini Pratiwi, Sp. Jiwa",
		spesialisasi: "Gangguan Kecemasan",
		pengalaman: "12 tahun",
		rekomendasi: "91%",
		harga: "Rp 70.000 / sesi",
	},
	{
		foto: "/avatar-psikolog.png",
		nama: "dr. Budi Santoso, M.Psi",
		spesialisasi: "Depresi & Burnout",
		pengalaman: "8 tahun",
		rekomendasi: "88%",
		harga: "Rp 65.000 / sesi",
	},
	{
		foto: "/avatar-psikolog.png",
		nama: "dr. Clara Wijaya, Sp.KJ",
		spesialisasi: "Kecemasan & Kelelahan",
		pengalaman: "10 tahun",
		rekomendasi: "93%",
		harga: "Rp 80.000 / sesi",
	},
	{
		foto: "/avatar-psikolog.png",
		nama: "dr. Dimas Prakoso, M.Psi",
		spesialisasi: "Burnout & Stres Kerja",
		pengalaman: "7 tahun",
		rekomendasi: "85%",
		harga: "Rp 60.000 / sesi",
	},
];

export default function PsikologPage() {
	const [selectedFilter, setSelectedFilter] = useState(filters[0]);
	const [showDetail, setShowDetail] = useState(false);
	const [selectedPsikolog, setSelectedPsikolog] = useState(psikologList[0]);
	const [showChat, setShowChat] = useState(false);
	const [isLogin, setIsLogin] = useState(true); // Ganti sesuai autentikasi
	const [isPaid, setIsPaid] = useState(false);
	const [chatMessages, setChatMessages] = useState<{from: "user" | "psikolog", text: string}[]>([]);
	const [chatInput, setChatInput] = useState("");
	const chatEndRef = useRef<HTMLDivElement>(null);

	// Scroll ke bawah otomatis saat ada pesan baru
	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatMessages, showChat]);

	// Fungsi kirim pesan
	const handleSendMessage = () => {
		if (!chatInput.trim()) return;
		setChatMessages([
			...chatMessages,
			{ from: "user", text: chatInput }
		]);
		setChatInput("");
		// Simulasi balasan psikolog
		setTimeout(() => {
			setChatMessages(msgs => [
				...msgs,
				{ from: "psikolog", text: "Terima kasih sudah menghubungi saya. Silakan ceritakan keluhan atau pertanyaan Anda." }
			]);
		}, 1200);
	};

	// Filter psikolog sesuai filter jika ingin diaktifkan
	// const filteredPsikolog = psikologList.filter(p => p.spesialisasi.toLowerCase().includes(selectedFilter.toLowerCase()));
	const filteredPsikolog = psikologList; // tampilkan semua

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
			{/* Header */}
			<header className="border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<Link href="/" className="flex items-center space-x-2">
							<Heart className="h-8 w-8 text-pink-500" />
							<h1 className="text-2xl font-bold text-gray-800">
								FriendYours
							</h1>
						</Link>
						<nav className="hidden md:flex space-x-6">
							<Link
								href="/curhat"
								className="text-gray-600 hover:text-gray-800 transition-colors"
							>
								Curhat
							</Link>
							<Link
								href="/komunitas"
								className="text-gray-600 hover:text-gray-800 transition-colors"
							>
								Komunitas
							</Link>
							<Link
								href="/tracking"
								className="text-gray-600 hover:text-gray-800 transition-colors"
							>
								Mood Tracking
							</Link>
							<Link
								href="/tanya-teman"
								className="text-gray-600 hover:text-gray-800 transition-colors"
							>
								Tanya Teman
							</Link>
						</nav>
					</div>
				</div>
			</header>

			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold text-center mb-6">
					Direktori Psikolog
				</h1>
				{/* Filter Tabs */}
				<div className="flex justify-center gap-2 mb-6">
					{filters.map((filter) => (
						<button
							key={filter}
							className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
								selectedFilter === filter
									? "bg-violet-600 text-white border-violet-600"
									: "bg-white text-gray-700 border-gray-300 hover:bg-violet-50"
							}`}
							onClick={() => setSelectedFilter(filter)}
						>
							{filter}
						</button>
					))}
				</div>

				{/* List Psikolog */}
				{!showDetail && (
					<div className="grid gap-4">
						{filteredPsikolog.map((psikolog, idx) => (
							<div
								key={idx}
								className="flex items-center gap-4 p-4 bg-white rounded-lg shadow border"
							>
								<img
									src={psikolog.foto}
									alt={psikolog.nama}
									className="w-16 h-16 rounded-full object-cover border"
								/>
								<div className="flex-1">
									<div className="font-semibold">{psikolog.nama}</div>
									<div className="text-sm text-gray-600">
										{psikolog.spesialisasi}
									</div>
									<div className="text-xs text-gray-500">
										Pengalaman: {psikolog.pengalaman}
									</div>
									<div className="text-xs text-gray-500">
										Rekomendasi: {psikolog.rekomendasi}
									</div>
									<div className="text-xs text-gray-500">
										Harga: {psikolog.harga}
									</div>
								</div>
								<button
									className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-700 text-sm"
									onClick={() => {
										setSelectedPsikolog(psikolog);
										setShowDetail(true);
									}}
								>
									Lihat Profil
								</button>
							</div>
						))}
					</div>
				)}

				{/* Detail Psikolog */}
				{showDetail && (
					<div className="bg-white rounded-lg shadow p-6 border mt-4 relative">
						<button
							className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
							onClick={() => setShowDetail(false)}
							aria-label="Kembali"
						>
							&larr; Kembali
						</button>
						<div className="flex gap-6 items-center">
							<img
								src={selectedPsikolog.foto}
								alt={selectedPsikolog.nama}
								className="w-20 h-20 rounded-full object-cover border"
							/>
							<div>
								<div className="font-bold text-lg">{selectedPsikolog.nama}</div>
								<div className="text-sm text-gray-600">
									{selectedPsikolog.spesialisasi}
								</div>
								<div className="text-xs text-gray-500">
									Pengalaman: {selectedPsikolog.pengalaman}
								</div>
								<div className="text-xs text-gray-500">
									Rekomendasi: {selectedPsikolog.rekomendasi}
								</div>
								<div className="text-xs text-gray-500">
									Harga: {selectedPsikolog.harga}
								</div>
								<div className="text-xs text-gray-500 mt-2">
									<span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded mr-2">
										Online
									</span>
									Keahlian: {selectedPsikolog.spesialisasi}, Depresi, Burnout
									<br />
									Tempat Praktik: Klinik Sehat Jiwa
								</div>
							</div>
						</div>
						<div className="mt-6">
							<button
								className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
								onClick={() => setShowChat(true)}
							>
								Chat Psikolog
							</button>
						</div>
					</div>
				)}

				{/* Menu Chat */}
				{showChat && (
					<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
						<div
							className="bg-white rounded-lg shadow-lg w-full max-w-xl flex flex-col relative"
							style={{ minHeight: 420, maxHeight: "90vh" }}
						>
							<button
								className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 z-10"
								onClick={() => setShowChat(false)}
								aria-label="Tutup"
							>
								&times;
							</button>
							{/* Cek login */}
							{!isLogin ? (
								<div className="flex flex-col justify-center items-center px-6 py-10">
									<p className="mb-4 text-center">Anda belum daftar akun. Silakan daftar akun terlebih dahulu untuk melanjutkan konsultasi.</p>
									<Link href="/curhat">
										<button className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 mb-2 w-full">
											Daftar Akun
										</button>
									</Link>
									<button
										className="block text-sm text-gray-500 underline"
										onClick={() => setShowChat(false)}
									>
										&larr; Kembali
									</button>
								</div>
							) : !isPaid ? (
								// Notifikasi pembayaran
								<div className="flex flex-col justify-center items-center px-6 py-10">
									<p className="mb-4 text-center font-medium">Lanjutkan konsultasi dengan melakukan pembayaran.</p>
									<div className="mb-4 p-3 bg-gray-100 rounded w-full text-sm">
										<div className="mb-1">Detail Pembayaran:</div>
										<div>Harga Sesi: <b>{selectedPsikolog.harga}</b></div>
										<div>Jadwal: Pilih jam sesi</div>
									</div>
									<button
										className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-2 w-full font-semibold"
										onClick={() => setIsPaid(true)}
									>
										Lakukan Pembayaran
									</button>
									<button
										className="block text-sm text-gray-500 underline"
										onClick={() => setShowChat(false)}
									>
										&larr; Kembali
									</button>
								</div>
							) : (
								// Chat Room
								<>
									{/* Header Chat */}
									<div className="flex items-center gap-3 border-b px-4 py-3 bg-violet-600 rounded-t-lg">
										<img
											src={selectedPsikolog.foto}
											alt={selectedPsikolog.nama}
											className="w-10 h-10 rounded-full border"
										/>
										<div>
											<div className="font-semibold text-white">
												{selectedPsikolog.nama}
											</div>
											<div className="text-xs text-violet-100">
												{selectedPsikolog.spesialisasi}
											</div>
										</div>
									</div>
									{/* Chat Body */}
									<div
										className="flex-1 overflow-y-auto px-4 py-3 bg-violet-50"
										style={{ minHeight: 280, maxHeight: 420 }}
									>
										{chatMessages.length === 0 && (
											<div className="text-center text-gray-400 mt-10 text-sm">
												Mulai chat dengan psikolog. Semua percakapan bersifat
												rahasia.
											</div>
										)}
										{chatMessages.map((msg, i) => (
											<div
												key={i}
												className={`flex mb-2 ${
													msg.from === "user"
														? "justify-end"
														: "justify-start"
												}`}
											>
												<div
													className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
														msg.from === "user"
															? "bg-violet-600 text-white rounded-br-none"
															: "bg-gray-200 text-gray-800 rounded-bl-none"
													}`}
												>
													{msg.text}
												</div>
											</div>
										))}
										<div ref={chatEndRef} />
									</div>
									{/* Chat Input */}
									<form
										className="flex gap-2 border-t px-4 py-3 bg-white"
										onSubmit={e => {
											e.preventDefault();
											handleSendMessage();
										}}
									>
										<input
											type="text"
											className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
											placeholder="Tulis pesan..."
											value={chatInput}
											onChange={e => setChatInput(e.target.value)}
											autoFocus
										/>
										<button
											type="submit"
											className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 transition"
										>
											Kirim
										</button>
									</form>
								</>
							)}
						</div>
					</div>
				)}

				{/* Navigasi ke fitur lain */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					<Link href="/curhat">
						<div className="bg-white/80 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition">
							<MessageCircle className="h-10 w-10 text-purple-600 mb-2" />
							<div className="font-semibold text-gray-800 mb-1">
								Curhat Anonim
							</div>
							<div className="text-gray-500 text-sm text-center">
								Ceritakan keluh kesahmu tanpa khawatir identitas terbongkar
							</div>
						</div>
					</Link>
					<Link href="/komunitas">
						<div className="bg-white/80 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition">
							<Users className="h-10 w-10 text-pink-600 mb-2" />
							<div className="font-semibold text-gray-800 mb-1">Komunitas</div>
							<div className="text-gray-500 text-sm text-center">
								Terhubung dengan sesama mahasiswa dan pekerja
							</div>
						</div>
					</Link>
					<Link href="/tracking">
						<div className="bg-white/80 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition">
							<Calendar className="h-10 w-10 text-green-600 mb-2" />
							<div className="font-semibold text-gray-800 mb-1">
								Mood Tracking
							</div>
							<div className="text-gray-500 text-sm text-center">
								Pantau perkembangan suasana hatimu setiap hari
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}