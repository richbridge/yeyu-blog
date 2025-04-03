// * 这里获取对应的文章, 然后直接发送给下一个组件用来渲染

// import  from '@/components/shared/article-display-page'
import { prisma } from '@/db'
import { notFound } from 'next/navigation'
import { processor } from '@/lib/markdown'
import ArticleDisplayPage from '@/components/shared/article-display-page'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const articles = await prisma.blog.findUnique({
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
  if (!articles) notFound()

  const { content, title, createdAt, tags } = articles
  const tagNames = tags.map(v => v.tag.tagName)

  const processedContent = await processor.process(content)

  return (
    // * 后序应该考虑共用组件, note 和 blog 只有很小的区别.
    <ArticleDisplayPage
      title={title}
      createdAt={createdAt?.toLocaleString()!}
      content={processedContent.toString()}
      tags={tagNames}
    />
  )
}
