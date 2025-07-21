"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MessageCircle, Heart } from "lucide-react"

interface EmergencyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <span>Kami Peduli Padamu</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Kami khawatir kamu mengalami tekanan berat. Ingat bahwa kamu tidak sendirian, dan ada bantuan profesional
            yang tersedia.
          </p>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Bantuan Darurat:</h4>
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
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => window.open("tel:119", "_blank")}>
              <Phone className="h-4 w-4 mr-2" />
              Hubungi Hotline Sekarang
            </Button>

            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              onClick={() => window.open("https://wa.me/6281199999119", "_blank")}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat dengan Konselor
            </Button>

            <Button variant="ghost" onClick={onClose} className="text-gray-600">
              Kembali ke Percakapan
            </Button>
          </div>

          <div className="text-center pt-4 border-t">
            <div className="flex items-center justify-center space-x-2 text-purple-600 mb-2">
              <Heart className="h-5 w-5" />
              <span className="font-medium">FriendYors</span>
            </div>
            <p className="text-xs text-gray-500">Kamu berharga dan layak mendapatkan bantuan</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
