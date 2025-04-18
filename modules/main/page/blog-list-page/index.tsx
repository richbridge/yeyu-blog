import BlogListItem from './internal/blog-list-item'
import { getAllShowBlogs } from '@/actions/blogs'

export default async function BlogListPage() {
  const allBlogs = await getAllShowBlogs()

  if (allBlogs.length === 0) {
    return <p className="m-auto">虚无。</p>
  }

  return (
    <main className="flex flex-col px-4">
      {allBlogs.map((v, i) => (
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
