import { BlogProvider } from '@/components/context/blog-context'
import { BlogSearch } from '@/components/shared/article-input'
import { BlogTagsContainer } from '@/components/shared/article-tags-container'
import BlogListTable from './internal/blog-list-table'
import { SelectedTagProvider } from '@/components/context/selected-tag'

export default function AdminBlogPage() {
  return (
    <SelectedTagProvider>
      <BlogProvider>
        <main className="w-full flex flex-col gap-2">
          <BlogSearch />
          <BlogTagsContainer />
          <BlogListTable />
        </main>
      </BlogProvider>
    </SelectedTagProvider>
  )
}
