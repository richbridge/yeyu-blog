import { getPublishedNoteHTMLBySlug } from '@/actions/notes'
import ArticleDisplayPage from '@/components/shared/article-display-page'
import ScrollIndicator from '@/components/shared/scroll-indicator'
import { prisma } from '@/db'
import { notFound } from 'next/navigation'

export const dynamicParams = true

export async function generateStaticParams() {
  const allArticles = await prisma.note.findMany({
    where: {
      isPublished: true,
    },
  })

  return allArticles.map(article => ({
    slug: article.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const article = await getPublishedNoteHTMLBySlug((await params).slug)

  if (!article)
    notFound()

  const { content, title, createdAt, tags } = article
  const tagNames = tags.map(v => v.tagName)

  return (
    <>
      <ArticleDisplayPage
        title={title}
        createdAt={createdAt}
        content={content}
        tags={tagNames}
      />
      <ScrollIndicator />
    </>
  )
}
