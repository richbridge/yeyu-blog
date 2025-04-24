import { BlogSearch } from './internal/blog-search'
import BlogListTable from './internal/blog-list-table'
import { BlogTagsContainer } from './internal/blog-tags-container'
import { getTagsOnBlog } from '@/actions/blogs'

export default async function AdminBlogPage() {
  const allTagsOnBlog = (await getTagsOnBlog()).map(v => v.tagName)

  return (
    <main className="w-full flex flex-col gap-2">
      <BlogSearch />
      <BlogTagsContainer tags={allTagsOnBlog} />
      <BlogListTable />
    </main>
  )
}
