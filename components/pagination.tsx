'use client'

import { Pagination } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  totalPages: number
  currentPage: number
}

export default function PaginationComponent({ totalPages, currentPage }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (_: any, value: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', value.toString())
    router.push(`/blogs?${params.toString()}`)
  }

  return (
    <div className="flex justify-center pt-10">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#e7e5e4',
          },
          '& .Mui-selected': {
            backgroundColor: '#be123c !important',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}