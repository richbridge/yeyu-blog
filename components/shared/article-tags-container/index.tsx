import { getTagsOnBlog } from '@/actions/blogs'
import { BlogTagItemToggle } from './internal/blog-tag-item-toggle'
import { getTagsOnNote } from '@/actions/notes'
import { NoteTagItemToggle } from './internal/note-tag-item-toggle'
import { BlogTag, NoteTag } from '@prisma/client'

export async function BlogTagsContainer() {
  let tags: BlogTag['tagName'][] = []

  try {
    tags = (await getTagsOnBlog()).map(v => v.tagName) as BlogTag['tagName'][]
  } catch (error) {
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2">
      {tags.map(tag => (
        <BlogTagItemToggle key={tag.toLowerCase()} tag={tag} />
      ))}
    </section>
  )
}

export async function NoteTagsContainer() {
  let tags: NoteTag['tagName'][] = []

  try {
    tags = (await getTagsOnNote()).map(v => v.tagName) as NoteTag['tagName'][]
  } catch (error) {
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2">
      {tags.map(tag => (
        <NoteTagItemToggle key={tag.toLowerCase()} tag={tag} />
      ))}
    </section>
  )
}
