import { BlogSearch } from './internal/blog-search'
import BlogListTable from './internal/blog-list-table'
import { BlogTagsContainer } from './internal/blog-tags-container'

export default async function AdminBlogPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <BlogSearch />
      <BlogTagsContainer />
      <BlogListTable />
    </main>
  )
}
