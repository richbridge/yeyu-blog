import { customMarkdownTheme } from '@/lib/markdown'
import { Badge } from '@/components/ui/badge'

export default function BlogDisplayPage({
  blogTitle,
  createdAt,
  blogContent,
  tags,
}: {
  blogTitle: string
  blogContent: string
  createdAt: string
  tags: string[]
}) {
  return (
    <article className="flex flex-col m-auto rounded-sm p-4 bg-slate-900">
      <header className="text-center">
        <h1 className="text-4xl font-bold">{blogTitle}</h1>
        <section className="flex flex-col gap-2 justify-center w-full">
          <div className="flex gap-2 justify-center w-full">
            {tags.map((tag, i) => (
              <Badge
                key={i}
                className="flex items-center font-mono font-light"
                variant={'secondary'}
              >{`#${tag}`}</Badge>
            ))}
          </div>
          <small>{createdAt}</small>
        </section>
      </header>

      {/* 渲染的主要内容 */}
      <main
        className={customMarkdownTheme}
        dangerouslySetInnerHTML={{ __html: blogContent }}
      ></main>
    </article>
  )
}
