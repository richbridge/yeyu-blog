import { getBlogTagsAndNoteTags } from '@/actions/tags'
import { create } from 'zustand'

// * 懒得做 tagType 枚举了, 这里设计的不好, 后序优化
export type Tags = Awaited<ReturnType<typeof getBlogTagsAndNoteTags>>

interface ITagStore {
  tags: Tags
  setTags: (tags: Tags) => void
}

// * 没必要分开存储, 直接塞一块了
export const useTagStore = create<ITagStore>(set => ({
  tags: [],
  setTags: tags => set({ tags }),
}))
