import { useEffect, useState } from 'react'
import { getAllEchos } from '@/actions/echos'
import { useEchoStore } from '@/store/use-echo-store'

export function useEchos() {
  const { echos, setEchos } = useEchoStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getAllEchos()
        setEchos(data)
      } catch (err: any) {
        setError(err.message || '加载失败')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [setEchos])

  return { echos, loading, error }
}
