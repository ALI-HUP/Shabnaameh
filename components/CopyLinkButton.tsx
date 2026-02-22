'use client'

import { useState } from 'react'
import { Snackbar } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'

export default function CopyLinkButton() {
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setOpen(false)
      setTimeout(() => setOpen(true), 50)
    } catch {}
  }

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm bg-rose-700/20 border border-rose-700/40 text-rose-400 rounded-full transition-all hover:bg-rose-700/30 hover:border-rose-500"
      >
        <ShareIcon sx={{ fontSize: 16 }} />
        اشتراک
      </button>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message="لینک با موفقیت کپی شد"
      />
    </>
  )
}
