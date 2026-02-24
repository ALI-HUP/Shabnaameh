'use client'

import { useEffect } from 'react'

export default function ViewTracker({ id }: { id: string }) {
  useEffect(() => {
    fetch('/api/view', {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
  }, [id])

  return null
}