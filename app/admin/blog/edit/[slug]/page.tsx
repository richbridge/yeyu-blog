import { prisma } from '@/db'
import AdminBlogEditPage from '@/components/shared/admin-article-edit-page'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // * 找到对应的 blog 然后传递渲染
  const article = await prisma.blog.findUnique({
    where: {
      slug: (await params).slug,
    },
    include: {
      tags: true,
    },
  })

  if (!article) notFound()

  const allTags = await prisma.blogTag.findMany()
  console.log(allTags, 'aaaaaaaaaaaaaa')

  const { tags } = article
  const relatedBlogTagNames = tags.map(v => v.tagName)

  return (
    <AdminBlogEditPage
      articles={article}
      relatedArticleTagNames={relatedBlogTagNames}
      allTags={allTags}
    />
  )
}
