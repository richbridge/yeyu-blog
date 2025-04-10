import { create } from 'zustand'
import { Blog } from '@prisma/client'

export type WithTagsBlog = Blog & {
  tags: {
    id: number
    tagName: string
  }[]
}
interface IBlogStore {
  blogs: WithTagsBlog[]
  setBlogs: (blogs: WithTagsBlog[]) => void
}

export const useBlogStore = create<IBlogStore>(set => ({
  blogs: [],
  setBlogs: blogs => set({ blogs }),
}))
