import { prisma } from '@/db'
import AdminBlogEditPage from '@/modules/admin/admin-blog-edit-page'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // * 找到对应的 blog 然后传递渲染
  const blog = await prisma.blog.findUnique({
    where: {
      slug: (await params).slug,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (!blog) notFound()

  const allTags = await prisma.tag.findMany()

  const { tags } = blog
  const relatedBlogTagNames = tags.map(v => v.tag.tagName)

  return (
    <AdminBlogEditPage
      blog={blog}
      relatedBlogTagNames={relatedBlogTagNames}
      allTags={allTags}
    />
  )
}
