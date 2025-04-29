import { getBlogBySlug } from '@/actions/blogs'
import { getBlogTags } from '@/actions/tags'
import AdminBlogEditPage from '@/components/shared/admin-article-edit-page'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] | undefined }>
}) {
  const slug = (await params).slug?.[0] ?? null

  const [article, allTags] = await Promise.all([
    slug ? getBlogBySlug(slug) : Promise.resolve(null),
    getBlogTags(),
  ])

  const relatedBlogTagNames = article ? article.tags.map(v => v.tagName) : []

  return (
    <AdminBlogEditPage
      article={article}
      relatedArticleTagNames={relatedBlogTagNames}
      allTags={allTags}
    />
  )
}
