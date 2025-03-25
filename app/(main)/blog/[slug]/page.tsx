// * 这里获取对应的文章, 然后直接发送给下一个组件用来渲染

import BlogDisplayPage from '@/modules/main/blog-display-page'
import { marked } from 'marked'

const blogContentRaw = `
## **基本文本格式**

Markdown 支持 **加粗**、*斜体* 和 ~~删除线~~。

你还可以使用 \`inline code\` 来展示代码片段。

---

## **列表测试**

### **无序列表**
- 这是一个无序列表项
- 另一个无序列表项
  - 嵌套列表项
  - 另一个嵌套项
- 继续测试无序列表

### **有序列表**
1. 这是一个有序列表项
2. 另一个有序列表项
   1. 嵌套的有序列表项
   2. 继续嵌套
3. 继续测试有序列表

---

## **代码块测试**

js
function greet(name) {
  return ;
}

console.log(greet("Markdown"));
`
const blogContent = await marked(blogContentRaw)

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const r = (await params).slug
  return (
    <BlogDisplayPage
      blogTitle="todo"
      createdAt="2025-03-15T10:00:00Z"
      blogContent={blogContent}
    />
  )
}
