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
      tags: true,
    },
  })

  if (!notes) notFound()

  const allTags = await prisma.noteTag.findMany()

  const { tags } = notes
  const relatedArticleTagNames = tags.map(v => v.tagName)

  return (
    <AdminBlogEditPage
      articles={notes}
      relatedArticleTagNames={relatedArticleTagNames}
      allTags={allTags}
    />
  )
}
