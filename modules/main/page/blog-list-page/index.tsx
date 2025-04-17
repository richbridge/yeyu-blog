import { prisma } from '@/db'
import BlogListItem from './internal/blog-list-item'

export default async function BlogListPage() {
  const allBlogs = await prisma.blog.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (allBlogs.length === 0) {
    return (
      <main className="flex flex-col min-h-[80vh]">
        <p className="m-auto">虚无。</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col p-2 min-h-[80vh]">
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
