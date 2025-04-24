'use client'

import { getAllNotes, getQueryNotes } from '@/actions/notes'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useNoteStore } from '@/store/use-note-store'
import { useNoteLoader } from '@/hooks/use-note-loader'

export function NoteSearch() {
  const { setNotes } = useNoteStore()
  const { query, setQuery, fetchNotes, resetNotes } = useNoteLoader(
    getAllNotes,
    getQueryNotes,
    setNotes,
  )

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
        onKeyDown={e => e.key === 'Enter' && fetchNotes()}
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
        onClick={resetNotes}
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
