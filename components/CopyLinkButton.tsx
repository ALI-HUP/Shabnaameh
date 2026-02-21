'use client'

import { useState } from 'react'

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-stone-400 transition-all duration-300 hover:text-white hover:[text-shadow:0_0_6px_rgba(244,63,94,0.9),0_0_16px_rgba(244,63,94,0.7)]"
    >
      {copied ? 'کپی شد ✓' : 'کپی لینک'}
    </button>
  )
}