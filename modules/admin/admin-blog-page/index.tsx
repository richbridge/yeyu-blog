import ArticleInput from '@/shared/article-input'
import ArticleTagsContainer from '@/shared/article-tags-container'
import BlogListTable from './internal/blog-list-table'

export default function AdminBlogPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <ArticleInput createType="创建博客" />
      <ArticleTagsContainer />
      <BlogListTable />
    </main>
  )
}
