import { prisma } from '@/db'
import AdminBlogEditPage from '@/components/shared/admin-article-edit-page'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] | undefined }>
}) {
  // * 找到对应的 blog 然后传递渲染
  const slug = (await params).slug?.[0] || null

  const article = slug
    ? await prisma.blog.findUnique({
        where: { slug },
        include: { tags: true },
      })
    : null

  const relatedBlogTagNames = article ? article.tags.map(v => v.tagName) : []

  const allTags = await prisma.blogTag.findMany()

  return (
    <AdminBlogEditPage
      articles={article}
      relatedArticleTagNames={relatedBlogTagNames}
      allTags={allTags}
    />
  )
}
