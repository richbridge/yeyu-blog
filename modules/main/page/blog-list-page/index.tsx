import BlogListItem from './internal/blog-list-item'
import { getAllShowBlogs } from '@/actions/blogs'

let count = 0

export default async function BlogListPage() {
  const allBlogs = await getAllShowBlogs()
  console.log('------------------')
  console.log(allBlogs.length, '----------------------')
  console.log('------------------', count++)

  if (allBlogs.length === 0) {
    return (
      <main className="flex flex-col min-h-[80vh]">
        <p className="m-auto">虚无。</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col p-2 min-h-[80vh]">
      {allBlogs.map((v: any, i: any) => (
        <BlogListItem
          key={i}
          blogTitle={v.title}
          createdAt={v.createdAt}
          slug={v.slug}
        />
      ))}
    </main>
  )
}
