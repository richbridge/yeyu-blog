import type { getBlogTagsAndNoteTags } from '@/actions/tags'
import { create } from 'zustand'

export type Tag = Awaited<ReturnType<typeof getBlogTagsAndNoteTags>>[number]

interface ITagStore {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
}

export const useTagStore = create<ITagStore>(set => ({
  tags: [],
  setTags: tags => set({ tags }),
}))
