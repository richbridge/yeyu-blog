import { getTagsOnBlog } from '@/actions/blogs'
import { BlogTagItemToggle } from './internal/blog-tag-item-toggle'
import { getTagsOnNote } from '@/actions/notes'
import { NoteTagItemToggle } from './internal/note-tag-item-toggle'

export async function BlogTagsContainer() {
  let tags: string[] = []

  try {
    tags = (await getTagsOnBlog()).map(v => v.tagName)
  } catch (error) {
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2">
      {tags.map((tag, i) => (
        <BlogTagItemToggle
          key={`${tag.toString()}-${i}+${tag[i]?.toUpperCase()}`}
          tag={tag}
        />
      ))}
    </section>
  )
}

export async function NoteTagsContainer() {
  let tags: string[] = []

  try {
    tags = (await getTagsOnNote()).map(v => v.tagName)
  } catch (error) {
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2">
      {tags.map((tag, i) => (
        <NoteTagItemToggle
          key={`${tag.toString()}-${i}+${tag[i]?.toUpperCase()}`}
          tag={tag}
        />
      ))}
    </section>
  )
}
