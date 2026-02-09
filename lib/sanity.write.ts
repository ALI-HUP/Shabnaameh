import { createClient } from '@sanity/client'

export const sanityWriteClient = createClient({
  projectId: '99l9wxcq',
  dataset: 'production',
  apiVersion: '2023-10-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})
