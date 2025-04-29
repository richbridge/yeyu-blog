import type { WithTagsBlog } from '@/actions/blogs'
import { create } from 'zustand'

interface IBlogStore {
  blogs: WithTagsBlog[]
  setBlogs: (blogs: WithTagsBlog[]) => void
}

export const useBlogStore = create<IBlogStore>(set => ({
  blogs: [],
  setBlogs: blogs => set({ blogs }),
}))
