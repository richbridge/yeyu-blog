import { Tag } from '@/store/use-tag-store'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useTagLoader(
  getAll: () => Promise<Tag[]>,
  getQuery: (q: string) => Promise<Tag[]>,
  setTags: (tags: Tag[]) => void,
) {
  const [query, setQuery] = useState('')

  const load = useCallback(
    async (fetchFn: () => Promise<Tag[]>, resetQuery = false) => {
      try {
        const data = await fetchFn()
        if (resetQuery) setQuery('')
        setTags(data)
      } catch {
        toast.error(resetQuery ? '重新加载出错' : '获取数据错误')
      }
    },
    [setTags],
  )

  const fetchTags = useCallback(() => {
    if (!query.trim()) {
      load(getAll, true)
    } else {
      load(() => getQuery(query))
    }
  }, [query, getAll, getQuery, load])

  const resetTags = useCallback(() => load(getAll, true), [getAll, load])

  return { query, setQuery, fetchTags, resetTags }
}
