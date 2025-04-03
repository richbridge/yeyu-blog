'use client'

import type { Note } from '@prisma/client'
import { createContext, useContext, useState } from 'react'

const BlogContext = createContext<{
  notes: Note[]
  setNotes: (notes: Note[]) => void
} | null>(null)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([] as Note[])

  return (
    <BlogContext.Provider value={{ notes, setNotes }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useNotes 必须在 NoteProvider 内部使用')
  }
  return context
}
