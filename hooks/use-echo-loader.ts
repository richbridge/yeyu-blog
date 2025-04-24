import { Echo } from '@prisma/client'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'

export function useEchoLoader(
  getAll: () => Promise<Echo[]>,
  getQuery: (q: string) => Promise<Echo[]>,
  setEchos: (echos: Echo[]) => void,
) {
  const [query, setQuery] = useState('')

  const load = useCallback(
    async (fetchFn: () => Promise<Echo[]>, resetQuery = false) => {
      try {
        const data = await fetchFn()
        if (resetQuery) setQuery('')
        setEchos(data)
      } catch {
        toast.error(resetQuery ? '重新加载出错' : '获取数据错误')
      }
    },
    [setEchos],
  )

  const fetchEchos = useCallback(() => {
    if (!query.trim()) {
      load(getAll, true)
    } else {
      load(() => getQuery(query))
    }
  }, [query, getAll, getQuery, load])

  const resetEchos = useCallback(() => load(getAll, true), [getAll, load])

  return { query, setQuery, fetchEchos, resetEchos }
}
