import { create } from 'zustand'
import { Blog } from '@prisma/client'

interface IBlogStore {
  blogs: Blog[]
  setBlogs: (blogs: Blog[]) => void
}

export const useBlogStore = create<IBlogStore>(set => ({
  blogs: [],
  setBlogs: blogs => set({ blogs }),
}))
