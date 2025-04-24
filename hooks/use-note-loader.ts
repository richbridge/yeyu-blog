import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { WithTagsNote } from '@/store/use-note-store'

export function useNoteLoader(
  getAll: () => Promise<WithTagsNote[]>,
  getQuery: (q: string) => Promise<WithTagsNote[]>,
  setNotes: (notes: WithTagsNote[]) => void,
) {
  const [query, setQuery] = useState('')

  const load = useCallback(
    async (fetchFn: () => Promise<WithTagsNote[]>, resetQuery = false) => {
      try {
        const data = await fetchFn()
        if (resetQuery) setQuery('')
        setNotes(data)
      } catch {
        toast.error(resetQuery ? '重新加载出错' : '获取数据错误')
      }
    },
    [setNotes],
  )

  const fetchNotes = useCallback(() => {
    if (!query.trim()) {
      load(getAll, true)
    } else {
      load(() => getQuery(query))
    }
  }, [query, getAll, getQuery, load])

  const resetNotes = useCallback(() => load(getAll, true), [getAll, load])

  return { query, setQuery, fetchNotes, resetNotes }
}
