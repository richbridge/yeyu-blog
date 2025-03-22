import BlogListItem from './internal/blog-list-item'

// * 在这里获取所有的链接, 然后渲染列表~
// * 这里使用服务端组件, 让客户端组件下沉去触发事件~
const blogPosts: {
  blogTitle: string
  createdAt: string
  slug: string
}[] = [
  {
    blogTitle: 'Understanding React Server Components',
    createdAt: '2025-03-01T12:00:00Z',
    slug: 'understanding-react-server-components',
  },
  {
    blogTitle: "Next.js 15: What's New?",
    createdAt: '2025-02-28T15:30:00Z',
    slug: 'nextjs-15-whats-new',
  },
  {
    blogTitle: 'Tailwind CSS Tips and Tricks',
    createdAt: '2025-02-25T08:45:00Z',
    slug: 'tailwind-css-tips-and-tricks',
  },
  {
    blogTitle: 'TypeScript vs JavaScript: Key Differences',
    createdAt: '2025-02-22T18:20:00Z',
    slug: 'typescript-vs-javascript-key-differences',
  },
  {
    blogTitle: 'How to Optimize React Performance',
    createdAt: '2025-02-20T10:10:00Z',
    slug: 'how-to-optimize-react-performance',
  },
  {
    blogTitle: 'Building a Simple Blog with Next.js',
    createdAt: '2025-02-18T09:00:00Z',
    slug: 'building-a-simple-blog-with-nextjs',
  },
  {
    blogTitle: 'Introduction to Go for JavaScript Developers',
    createdAt: '2025-02-15T16:40:00Z',
    slug: 'introduction-to-go-for-javascript-developers',
  },
  {
    blogTitle: 'ShadCN UI: A Modern UI Library for React',
    createdAt: '2025-02-12T14:30:00Z',
    slug: 'shadcn-ui-modern-ui-library-for-react',
  },
  {
    blogTitle: 'OAuth2 Authentication with Next.js',
    createdAt: '2025-02-10T07:15:00Z',
    slug: 'oauth2-authentication-with-nextjs',
  },
  {
    blogTitle:
      'Mastering Zustand for State Management Mastering Zustand for State Management',
    createdAt: '2025-02-05T20:05:00Z',
    slug: 'mastering-zustand-for-state-management',
  },
]

export default function BlogPage() {
  return (
    <main className="flex flex-col p-2">
      {/* 使用时间排序, 最新的在上面 */}
      {blogPosts.map((v, i) => (
        <BlogListItem
          key={i}
          blogTitle={v.blogTitle}
          createdAt={v.createdAt}
          slug={v.slug}
        />
      ))}
    </main>
  )
}
