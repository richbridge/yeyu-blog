import { prisma } from '@/db'
import AdminBlogEditPage from '@/components/shared/admin-article-edit-page'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // * 找到对应的 blog 然后传递渲染
  const notes = await prisma.note.findUnique({
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

  if (!notes) notFound()

  const allTags = await prisma.tag.findMany()

  const { tags } = notes
  const relatedArticleTagNames = tags.map(v => v.tag.tagName)

  return (
    <AdminBlogEditPage
      articles={notes}
      relatedArticleTagNames={relatedArticleTagNames}
      allTags={allTags}
    />
  )
}
