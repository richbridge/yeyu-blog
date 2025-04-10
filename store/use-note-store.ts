import { create } from 'zustand'
import { Note } from '@prisma/client'

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
