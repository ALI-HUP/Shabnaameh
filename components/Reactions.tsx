'use client'

import { useState } from 'react'
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbUp,
  ThumbDown,
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
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null)

  const react = async (type: 'like' | 'dislike') => {
    if (reaction === type) return

    await fetch('/api/react', {
      method: 'POST',
      body: JSON.stringify({ id, type }),
    })

    if (type === 'like') {
      setLocalLikes((v) => v + 1)
      if (reaction === 'dislike') {
        setLocalDislikes((v) => v - 1)
      }
    } else {
      setLocalDislikes((v) => v + 1)
      if (reaction === 'like') {
        setLocalLikes((v) => v - 1)
      }
    }

    setReaction(type)
  }

  return (
    <div className="flex items-center justify-between bg-gray-800/60 border border-rose-700/40 rounded-xl px-6 py-4 backdrop-blur-sm">

      <button
        onClick={() => react('like')}
        className="flex items-center gap-2 transition-all"
      >
        {reaction === 'like'
          ? <ThumbUp fontSize="small" className="text-rose-400" />
          : <ThumbUpAltOutlined fontSize="small" className="text-stone-300" />
        }
        <span className="text-sm font-medium">
          {localLikes}
        </span>
      </button>

      <button
        onClick={() => react('dislike')}
        className="flex items-center gap-2 transition-all"
      >
        {reaction === 'dislike'
          ? <ThumbDown fontSize="small" className="text-rose-400" />
          : <ThumbDownAltOutlined fontSize="small" className="text-stone-300" />
        }
        <span className="text-sm font-medium">
          {localDislikes}
        </span>
      </button>

      <div className="flex items-center gap-2 text-stone-400">
        <VisibilityOutlined fontSize="small" />
        <span className="text-sm font-medium">
          {views}
        </span>
      </div>
    </div>
  )
}