import { create } from 'zustand'

interface ISelectedTag {
  selectedTags: string[]
  setSelectedTags: (selectedTags: string[]) => void
}

export const useSelectedTagStore = create<ISelectedTag>(set => ({
  selectedTags: [],
  setSelectedTags: selectedTags => set({ selectedTags }),
}))
