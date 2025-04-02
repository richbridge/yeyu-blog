'use client'

import { createContext, useContext, useState } from 'react'

const SelectedTagsContext = createContext<{
  selectedTags: string[]
  setSelectedTags: (selectedTags: string[]) => void
} | null>(null)

export function SelectedTagProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedTags, setSelectedTags] = useState([] as string[])

  return (
    <SelectedTagsContext.Provider value={{ selectedTags, setSelectedTags }}>
      {children}
    </SelectedTagsContext.Provider>
  )
}

export function useSelectedTags() {
  const context = useContext(SelectedTagsContext)
  if (!context) {
    throw new Error('useSelectedTags 必须在 SelectedTagsProvider 内部使用')
  }
  return context
}
