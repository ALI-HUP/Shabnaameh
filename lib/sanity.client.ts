import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '99l9wxcq',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: false,
})
