import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule =>
        rule
          .required()
          .min(1)
          .max(35)
          .error('Title must be between 1 and 35 characters'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        maxLength: 96,
      },
      validation: rule =>
        rule.required().error('Slug is required'),
    }),

    defineField({
      name: 'nickname',
      title: 'Nickname',
      type: 'string',
      validation: rule => rule.max(40),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: rule =>
        rule.required().min(1).error('Body is required'),
    }),
  ],
})
