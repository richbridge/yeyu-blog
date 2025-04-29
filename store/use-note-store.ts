import type { Note } from '@prisma/client'
import { create } from 'zustand'

export type WithTagsNote = Note & {
  tags: {
    id: number
    tagName: string
  }[]
}
interface INoteStore {
  notes: WithTagsNote[]
  setNotes: (notes: WithTagsNote[]) => void
}

export const useNoteStore = create<INoteStore>(set => ({
  notes: [],
  setNotes: notes => set({ notes }),
}))
