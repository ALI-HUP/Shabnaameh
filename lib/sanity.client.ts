import 'server-only'
import { createClient } from '@sanity/client'

if (!process.env.SANITY_WRITE_TOKEN) {
  throw new Error('Missing SANITY_WRITE_TOKEN')
}

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})