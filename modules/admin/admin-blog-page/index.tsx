import { BlogProvider } from '@/components/context/blog-context'
import ArticleInput from '@/shared/article-input'
import ArticleTagsContainer from '@/shared/article-tags-container'
import BlogListTable from './internal/blog-list-table'
import { SelectedTagProvider } from '@/components/context/selected-tag'

export default function AdminBlogPage() {
  return (
    <BlogProvider>
      <SelectedTagProvider>
        <main className="w-full flex flex-col gap-2">
          <ArticleInput createType="博客" />
          <ArticleTagsContainer />
          <BlogListTable />
        </main>
      </SelectedTagProvider>
    </BlogProvider>
  )
}
