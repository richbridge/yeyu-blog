'use client'

import { getAllNotes, getQueryNotes } from '@/actions/notes'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useNoteStore } from '@/store/use-note-store'
import { toast } from 'sonner'

export function NoteSearch() {
  const [query, setQuery] = useState('')
  const { setNotes } = useNoteStore()

  useEffect(() => {
    getAllNotes().then(setNotes)
  }, [])

  const fetchNotes = async () => {
    if (!query.trim()) {
      return await loadAllNotes()
    }
    try {
      const notes = await getQueryNotes(query)
      setNotes(notes)
    } catch (error) {
      console.error(`获取博客数据错误`, error)
    }
  }

  const loadAllNotes = async () => {
    try {
      const allNotes = await getAllNotes()
      setQuery('')
      setNotes(allNotes)
    } catch (error) {
      toast.error(`获取笔记数据错误 ${error}`)
      console.error(`获取笔记数据错误`, error)
    }
  }

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入标题喵~"
        className="w-1/4"
        value={query}
        onChange={e => {
          const value = e.target.value
          if (value === ' ') return
          setQuery(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchNotes()
          }
        }}
      />

      <Button
        type="button"
        variant={'secondary'}
        onClick={fetchNotes}
        className="cursor-pointer"
      >
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={loadAllNotes}
        className="cursor-pointer"
      >
        <RotateCw /> 重置
      </Button>

      <Link
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'cursor-pointer',
        )}
        href={`note/edit`}
      >
        <Plus /> {`创建笔记`}
      </Link>
    </section>
  )
}
