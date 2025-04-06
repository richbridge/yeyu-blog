import { create } from 'zustand'
import { Note } from '@prisma/client'

interface INoteStore {
  notes: Note[]
  setNotes: (blogs: Note[]) => void
}

export const useNoteStore = create<INoteStore>(set => ({
  notes: [],
  setNotes: notes => set({ notes }),
}))
