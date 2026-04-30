import { useState } from 'react'
import { X, Truck } from 'lucide-react'

export default function BannerPromo() {
  return (
    <div className="bg-[#60804F] text-white text-sm py-2.5 px-6 flex items-center justify-center gap-2 relative">
      <Truck className="w-4 h-4 shrink-0" />
      <span className="flex flex-col sm:flex-row sm:gap-1 items-center text-center">
        <span>Envíos a todo Córdoba -</span>
        <a
          href="https://wa.me/5493517707999"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2 hover:text-[#d4f0b0] transition-colors"
        >
          Consultá por WhatsApp
        </a>
      </span>
    </div>
  )
}
