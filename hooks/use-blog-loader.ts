import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { WithTagsBlog } from '@/actions/blogs'

export function useBlogLoader(
  getAll: () => Promise<WithTagsBlog[]>,
  getQuery: (q: string) => Promise<WithTagsBlog[]>,
  setBlogs: (notes: WithTagsBlog[]) => void,
) {
  const [query, setQuery] = useState('')

  const load = useCallback(
    async (fetchFn: () => Promise<WithTagsBlog[]>, resetQuery = false) => {
      try {
        const data = await fetchFn()
        if (resetQuery) setQuery('')
        setBlogs(data)
      } catch {
        toast.error(resetQuery ? '重新加载出错' : '获取数据错误')
      }
    },
    [setBlogs],
  )

  const fetchBlogs = useCallback(() => {
    if (!query.trim()) {
      load(getAll, true)
    } else {
      load(() => getQuery(query))
    }
  }, [query, getAll, getQuery, load])

  const resetNotes = useCallback(() => load(getAll, true), [getAll, load])

  return { query, setQuery, fetchBlogs, resetNotes }
}
