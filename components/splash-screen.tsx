"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2000)
    const hideTimer = setTimeout(() => setVisible(false), 2500)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-100 bg-white flex items-center justify-center transition-opacity duration-600"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
    >
      <div
        className="transition-transform duration-600"
        style={{ transform: fading ? 'scale(1.05)' : 'scale(1)' }}
      >
        <Image
          src="/run-for-smiles.png"
          alt="Miles for Smiles 2026"
          width={480}
          height={480}
          priority
          className="object-contain w-[80vw] max-w-md"
        />
      </div>
    </div>
  )
}
