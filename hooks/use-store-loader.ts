import { useEffect, useState } from 'react'

export function useStoreLoader<T>(
  getAll: () => Promise<T[]>,
  setData: (data: T[]) => void,
  data: T[],
) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const result = await getAll()
        setData(result)
      }
      catch {
        setError('加载失败')
      }
      finally {
        setLoading(false)
      }
    }
    load()
  }, [getAll, setData])

  return { data, loading, error }
}
