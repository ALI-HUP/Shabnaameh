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
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    publishedAt,
    nickname,
    likes,
    dislikes,
    views
  }
`

export const paginatedPostsQuery = `
  *[_type == "post" && defined(slug.current)] 
  | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug { current },
    publishedAt
  }
`

export const postsCountQuery = `
  count(*[_type == "post" && defined(slug.current)])
`