'use client'

import { getAllBlogs, getQueryBlogs } from '@/actions/blogs'
import { getAllNotes, getQueryNotes } from '@/actions/notes'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useBlogStore } from '@/store/use-blog-store'
import { useNoteStore } from '@/store/use-note-store'

export function BlogSearch() {
  const [query, setQuery] = useState('')
  const { setBlogs } = useBlogStore()
  const [refresh, setRefresh] = useState(true)

  const fetchBlogs = async () => {
    if (!query.trim()) return
    try {
      const blogs = await getQueryBlogs(query)
      setBlogs(blogs)
    } catch (error) {
      console.error(`获取博客数据错误`, error)
    }
  }

  // * 默认加载所有的数据, 先不考虑分页的事
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const blogs = await getAllBlogs()
        setBlogs(blogs)
      } catch (error) {
        console.error(`获取博客数据错误`, error)
      }
    }
    fetchAllBlogs()
  }, [refresh])

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入标题喵~"
        className="w-1/4"
        value={query}
        onChange={e => {
          if (e.target.value === ' ') return
          setQuery(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchBlogs()
          }
        }}
      />

      <Button type="button" variant={'secondary'} onClick={fetchBlogs}>
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
        href={`blog/edit`}
      >
        <Plus /> {`创建博客`}
      </Link>
    </section>
  )
}

export function NoteSearch() {
  const [query, setQuery] = useState('')
  const { setNotes } = useNoteStore()
  const [refresh, setRefresh] = useState(true)

  const fetchNotes = async () => {
    if (!query.trim()) return
    try {
      const notes = await getQueryNotes(query)
      setNotes(notes)
    } catch (error) {
      console.error(`获取博客数据错误`, error)
    }
  }

  // * 默认加载所有的数据, 先不考虑分页的事
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const notes = await getAllNotes()
        setNotes(notes)
      } catch (error) {
        console.error(`获取博客数据错误`, error)
      }
    }
    fetchAllNotes()
  }, [refresh])

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入标题喵~"
        className="w-1/4"
        value={query}
        onChange={e => {
          if (e.target.value === ' ') return
          setQuery(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchNotes()
          }
        }}
      />

      <Button type="button" variant={'secondary'} onClick={fetchNotes}>
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
        <Plus /> {`创建笔记`}
      </Link>
    </section>
  )
}
