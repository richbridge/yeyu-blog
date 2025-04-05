'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Plus, RotateCw, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function EchoSearch() {
  const [query, setQuery] = useState('')
  // const { setNotes } = useNotes()
  const [refresh, setRefresh] = useState(true)

  // const fetchNotes = async () => {
  //   if (!query.trim()) return
  //   try {
  //     const notes = await getQueryNotes(query)
  //     setNotes(notes)
  //   } catch (error) {
  //     console.error(`获取博客数据错误`, error)
  //   }
  // }

  // * 默认加载所有的数据, 先不考虑分页的事
  // useEffect(() => {
  //   const fetchAllNotes = async () => {
  //     try {
  //       const notes = await getAllNotes()
  //       setNotes(notes)
  //     } catch (error) {
  //       console.error(`获取博客数据错误`, error)
  //     }
  //   }
  //   fetchAllNotes()
  // }, [refresh])

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入短语喵~"
        className="w-1/4"
        value={query}
        onChange={e => {
          if (e.target.value === ' ') return
          setQuery(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            // fetchNotes()
          }
        }}
      />

      <Button type="button" variant={'secondary'}>
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={() => {
          if (query !== '') {
            setQuery('')
            setRefresh(!refresh)
          }
        }}
      >
        <RotateCw /> 重置
      </Button>

      <Link
        className={cn(buttonVariants({ variant: 'secondary' }))}
        href={`note/edit`}
      >
        <Plus /> {`创建短语`}
      </Link>
    </section>
  )
}
