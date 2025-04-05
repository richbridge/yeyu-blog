import { BlogSearch } from '@/components/shared/article-input'
import { BlogTagsContainer } from '@/components/shared/article-tags-container'
import BlogListTable from './internal/blog-list-table'

export default function AdminBlogPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <BlogSearch />
      <BlogTagsContainer />
      <BlogListTable />
    </main>
  )
}
