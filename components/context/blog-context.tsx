'use client'

import type { Blog } from '@prisma/client'
import { createContext, useContext, useState } from 'react'

const BlogContext = createContext<{
  blogs: Blog[]
  setBlogs: (blogs: Blog[]) => void
} | null>(null)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState([] as Blog[])

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlogs() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlogs 必须在 BlogProvider 内部使用')
  }
  return context
}
