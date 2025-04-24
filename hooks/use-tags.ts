import { getBlogTagsAndNoteTags } from '@/actions/tags'
import { useTagStore } from '@/store/use-tag-store'
import { useEffect, useState } from 'react'

export function useTags() {
  const { setTags, tags } = useTagStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getBlogTagsAndNoteTags()
        setTags(data)
      } catch (err: any) {
        setError(err.message || '加载失败')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [setTags])

  return { tags, loading, error }
}
