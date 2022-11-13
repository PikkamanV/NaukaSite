import { contentFunc } from '@nuxt/content/types/content'

export type Post = {
  slug: string
  title: string
  img?: string
  alt?: string
  tags?: string[]
  createdAt?: Date
  description?: string
}

export async function fetchPost (
  $content: contentFunc,
  slug: string
) {
  const post = await $content(`posts/${slug}`).fetch<Post>()
  const [prev, next] = await $content('posts')
    .only(['title', 'slug'])
    .sortBy('createdAt', 'asc')
    .surround(slug)
    .fetch<Post[]>()

  return { post, prev, next }
}

export async function fetchPosts (
  $content: contentFunc,
  tag?: string,
  limit?: number
) {
  const whereParam = tag ? { tags: { $contains: [tag] } } : {}
  const query = await $content('posts')
    .sortBy('createdAt', 'desc')
    .where(whereParam)

  if (limit) {
    const contents = query.limit(limit).fetch<Post[]>()
    return contents
  }
  const contents = query.fetch<Post[]>()
  return contents
}
