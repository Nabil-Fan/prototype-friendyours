"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MessageCircle, Heart, Sparkles } from "lucide-react"

interface EmergencyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-red-50 to-pink-50">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <span>🤗 Kami Peduli Padamu</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Kami khawatir kamu mengalami tekanan berat. Ingat bahwa kamu tidak sendirian, dan ada bantuan profesional
            yang tersedia. Kamu berharga! 💙
          </p>

          <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">🚨 Bantuan Darurat:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-600" />
                <span>Hotline Kesehatan Mental: 119 ext 8</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-red-600" />
                <span>WhatsApp Konseling: 0811-9999-119</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
              onClick={() => window.open("tel:119", "_blank")}
            >
              <Phone className="h-4 w-4 mr-2" />📞 Hubungi Hotline Sekarang
            </Button>

            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-gradient-to-r from-purple-50 to-pink-50"
              onClick={() => window.open("https://wa.me/6281199999119", "_blank")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />💬 Chat dengan Konselor
            </Button>

            <Button variant="ghost" onClick={onClose} className="text-gray-600 hover:bg-gray-100">
              Kembali ke Percakapan
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-pink-200">
            <div className="flex items-center justify-center space-x-2 text-purple-600 mb-2">
              <div className="relative">
                <Heart className="h-5 w-5" />
                <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <span className="font-medium bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                FriendYours
              </span>
            </div>
            <p className="text-xs text-gray-500">🌈 Kamu berharga dan layak mendapatkan bantuan 🌈</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
