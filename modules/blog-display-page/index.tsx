export default function BlogDisplayPage({
  blogTitle,
  createdAt,
  blogContent,
}: {
  blogTitle: string
  blogContent: string
  createdAt: string
}) {
  return (
    <article className="flex flex-col bg-slate-900 m-auto rounded-sm">
      <header className="p-4">
        <h1 className="text-3xl">{blogTitle}</h1>
        <section>{createdAt}</section>
      </header>

      {/* 渲染的主要内容 */}
      <main>{blogContent}</main>
    </article>
  )
}
