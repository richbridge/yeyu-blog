// * 这里获取对应的文章, 然后直接发送给下一个组件用来渲染

import BlogDisplayPage from '@/modules/main/blog-display-page'
import matter from 'gray-matter'
import fs from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { transformerCopyButton } from '@rehype-pretty/transformers'

// * 这个 filePath 应该后序是 slug, 然后数据库获取~
const filePath = `md/2.md`
const fileContent = fs.readFileSync(filePath, 'utf-8')
const { data, content } = matter(fileContent)
console.log(data, 'what data?')

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    theme: 'aurora-x',
    defaultLang: 'js',
    transformers: [
      transformerCopyButton({
        visibility: 'hover',
        feedbackDuration: 3_000,
      }),
    ],
  })
  .use(rehypeStringify)
  .process(content)

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // * 获取 slug 参数, 去数据库找对应的文章, 找不到就 404
  const r = (await params).slug
  return (
    <BlogDisplayPage
      blogTitle={data.title}
      createdAt="2025-03-15T10:00:00Z"
      blogContent={(await processor).toString()}
    />
  )
}
