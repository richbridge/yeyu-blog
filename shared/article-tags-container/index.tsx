import { getTagsOnBlog } from '@/actions/blogs'
import TagItem from './internal/tag-item'

export default async function ArticleTagsContainer() {
  let tags: string[] = []

  try {
    tags = (await getTagsOnBlog()).map(v => v.tagName)
  } catch (error) {
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2 bg-slate-700">
      {tags.map(tag => (
        <TagItem key={tag}>{tag}</TagItem>
      ))}
    </section>
  )
}
