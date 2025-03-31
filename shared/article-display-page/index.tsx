import { customMarkdownTheme } from '@/lib/markdown'
import ArticleDisplayHeader from './internal/article-display-header'

export default function ArticleDisplayPage({
  blogTitle,
  createdAt,
  tags,
  blogContent,
}: {
  blogTitle: string
  blogContent: string
  createdAt: string
  tags: string[]
}) {
  return (
    <article className="flex flex-col m-auto rounded-sm p-4 bg-slate-900">
      <ArticleDisplayHeader
        blogTitle={blogTitle}
        createdAt={createdAt}
        tags={tags}
      />
      {/* 渲染的主要内容 */}
      <main
        className={customMarkdownTheme}
        dangerouslySetInnerHTML={{ __html: blogContent }}
      ></main>
    </article>
  )
}
