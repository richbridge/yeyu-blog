import { BlogSearch } from './internal/blog-search'
import BlogListTable from './internal/blog-list-table'
import { getTagsOnBlog } from '@/actions/blogs'
import { BlogTag } from '@prisma/client'
import { BlogTagItemToggle } from '@/components/shared/tag-item-toggle'
import { toast } from 'sonner'

export default async function AdminBlogPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <BlogSearch />
      <BlogTagsContainer />
      <BlogListTable />
    </main>
  )
}

async function BlogTagsContainer() {
  let tags: BlogTag['tagName'][] = []

  try {
    tags = (await getTagsOnBlog()).map(v => v.tagName)
  } catch (error) {
    toast.error(`获取 tags 数据错误 ${error}`)
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
