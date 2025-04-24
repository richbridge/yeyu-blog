import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/use-note-store'
import { getAllNotes } from '@/actions/notes'

export function useNotes() {
  const { notes, setNotes } = useNoteStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getAllNotes()
        setNotes(data)
      } catch (err: any) {
        setError(err.message || '加载失败')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [setNotes])

  return { notes, loading, error }
}
