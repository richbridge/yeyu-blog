import { getTagsOnBlog } from '@/actions/blogs'
import TagItem from './internal/tag-item-toggle'

export default async function ArticleTagsContainer() {
  let tags: string[] = []

  try {
    tags = (await getTagsOnBlog()).map(v => v.tagName)
  } catch (error) {
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2">
      {tags.map((tag, i) => (
        <TagItem
          key={`${tag.toString()}-${i}+${tag[i]?.toUpperCase()}`}
          tag={tag}
        />
      ))}
    </section>
  )
}
