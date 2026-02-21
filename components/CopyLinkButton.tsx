'use client'

import { useState } from 'react'
import { IconButton, Snackbar, Alert } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'

export default function CopyLinkButton() {
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setOpen(true)
    } catch {
      setOpen(false)
    }
  }

  return (
    <>
      <IconButton
        onClick={handleCopy}
        sx={{
          color: '#a8a29e',
          transition: 'all .3s',
          '&:hover': {
            color: '#f43f5e',
            backgroundColor: 'rgba(244,63,94,0.08)',
          },
        }}
      >
        <ShareIcon fontSize="small" />
      </IconButton>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            backgroundColor: '#1f1f1f',
            color: '#fff',
            border: '1px solid rgba(244,63,94,0.5)',
          }}
        >
          لینک با موفقیت کپی شد
        </Alert>
      </Snackbar>
    </>
  )
}