import { useEffect, useState } from 'react'
import { useBlogStore } from '@/store/use-blog-store'
import { getAllBlogs } from '@/actions/blogs'

export function useBlogs() {
  const { blogs, setBlogs } = useBlogStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getAllBlogs()
        setBlogs(data)
      } catch (err: any) {
        setError(err.message || '加载失败')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [setBlogs])

  return { blogs, loading, error }
}
