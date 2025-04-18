import BlogListItem from './internal/blog-list-item'
import { getAllShowBlogs } from '@/actions/blogs'

export default async function BlogListPage() {
  const allBlogs = await getAllShowBlogs()

  if (allBlogs.length === 0) {
    return (
      <main className="flex flex-col min-h-[85vh]">
        <p className="m-auto">虚无。</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col px-4 py-2 min-h-[85vh]">
      {allBlogs.map((v: any, i: any) => (
        <BlogListItem
          key={i}
          blogTitle={v.title}
          createdAt={v.createdAt}
          slug={v.slug}
        />
      ))}
    </main>
  )
}
