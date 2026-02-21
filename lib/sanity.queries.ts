export const allPostsQuery = `
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc, _createdAt desc) {
    _id,
    title,
    slug { current },
    publishedAt
  }
`

export const singlePostQuery = `
  *[_type == "post" && defined(slug.current) && slug.current == $slug][0] {
    _id,
    title,
    body,
    publishedAt
  }
`
