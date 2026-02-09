export const allPostsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug {
      current
    },
    publishedAt
  }
`

export const singlePostQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    publishedAt
  }
`
