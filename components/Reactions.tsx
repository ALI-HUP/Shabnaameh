'use client'

import { useState } from 'react'
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'

export default function Reactions({
  id,
  likes,
  dislikes,
  views,
}: {
  id: string
  likes: number
  dislikes: number
  views: number
}) {
  const [localLikes, setLocalLikes] = useState(likes)
  const [localDislikes, setLocalDislikes] = useState(dislikes)

  const react = async (type: 'like' | 'dislike') => {
    const voted = localStorage.getItem(`voted-${id}`)
    if (voted) return

    await fetch('/api/react', {
      method: 'POST',
      body: JSON.stringify({ id, type }),
    })

    if (type === 'like') setLocalLikes((v) => v + 1)
    else setLocalDislikes((v) => v + 1)

    localStorage.setItem(`voted-${id}`, type)
  }

  return (
    <div className="flex items-center justify-between bg-gray-800/60 border border-rose-700/40 rounded-xl px-6 py-4 backdrop-blur-sm">

      <button
        onClick={() => react('like')}
        className="flex items-center gap-2 text-stone-300 hover:text-rose-400 transition-all"
      >
        <ThumbUpAltOutlined fontSize="small" />
        <span className="text-sm font-medium">{localLikes}</span>
      </button>

      <button
        onClick={() => react('dislike')}
        className="flex items-center gap-2 text-stone-300 hover:text-rose-400 transition-all"
      >
        <ThumbDownAltOutlined fontSize="small" />
        <span className="text-sm font-medium">{localDislikes}</span>
      </button>

      <div className="flex items-center gap-2 text-stone-400">
        <VisibilityOutlined fontSize="small" />
        <span className="text-sm font-medium">{views}</span>
      </div>
    </div>
  )
}