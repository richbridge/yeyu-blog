import { create } from 'zustand'
import { WithTagsBlog } from '@/actions/blogs'

interface IBlogStore {
  blogs: WithTagsBlog[]
  setBlogs: (blogs: WithTagsBlog[]) => void
}

export const useBlogStore = create<IBlogStore>(set => ({
  blogs: [],
  setBlogs: blogs => set({ blogs }),
}))
