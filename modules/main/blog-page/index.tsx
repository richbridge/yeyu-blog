import { prisma } from '@/db'
import BlogListItem from './internal/blog-list-item'
import { notFound } from 'next/navigation'

// * 在这里获取所有的链接, 然后渲染列表~
// * 这里使用服务端组件, 让客户端组件下沉去触发事件~

export default async function BlogPage() {
  const allBlogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (allBlogs.length === 0) {
    // * 后序应该统一处理, 不应该直接 notFound ...
    notFound()
  }

  return (
    <main className="flex flex-col p-2">
      {/* 使用时间排序, 最新的在上面 */}
      {allBlogs.map((v, i) => (
        <BlogListItem
          key={i}
          blogTitle={v.title}
          createdAt={v.createdAt.toLocaleString()}
          slug={v.slug}
        />
      ))}
    </main>
  )
}
