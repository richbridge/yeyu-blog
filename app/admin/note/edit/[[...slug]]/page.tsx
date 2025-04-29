import { getNoteBySlug } from '@/actions/notes'
import { getNoteTags } from '@/actions/tags'
import AdminBlogEditPage from '@/components/shared/admin-article-edit-page'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] | undefined }>
}) {
  const slug = (await params).slug?.[0] ?? null

  const [article, allTags] = await Promise.all([
    slug ? getNoteBySlug(slug) : Promise.resolve(null),
    getNoteTags(),
  ])

  const relatedArticleTagNames = article ? article.tags.map(v => v.tagName) : []

  return (
    <AdminBlogEditPage
      article={article}
      relatedArticleTagNames={relatedArticleTagNames}
      allTags={allTags}
    />
  )
}
