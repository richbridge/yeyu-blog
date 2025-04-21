import { customMarkdownTheme } from '@/lib/markdown'
import ArticleDisplayHeader from './internal/article-display-header'

export default function ArticleDisplayPage({
  title,
  createdAt,
  tags,
  content,
}: {
  title: string
  content: string
  createdAt: Date
  tags: string[]
}) {
  return (
    <article
      className="flex flex-col py-2 px-6 max-w-3xl flex-1 dark:bg-gray-900/30 bg-slate-300/30 rounded-sm
                  border border-dashed border-indigo-200 dark:border-accent 
                  backdrop-blur-[1px] z-10"
    >
      <ArticleDisplayHeader title={title} createdAt={createdAt} tags={tags} />
      {/* 渲染的主要内容 */}
      <main
        className={customMarkdownTheme}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
