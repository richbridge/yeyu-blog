'use client'

import { getAllBlogs, getQueryBlogs, WithTagsBlog } from '@/actions/blogs'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useBlogStore } from '@/store/use-blog-store'

export function BlogSearch({ blogs }: { blogs: WithTagsBlog[] }) {
  const [query, setQuery] = useState('')
  const { setBlogs } = useBlogStore()

  // * 初次加载
  useEffect(() => {
    setBlogs(blogs)
  }, [blogs])

  const fetchBlogs = async () => {
    if (!query.trim()) return
    try {
      const blogs = await getQueryBlogs(query)
      setBlogs(blogs)
    } catch (error) {
      console.error(`获取博客数据错误`, error)
    }
  }

  const resetBlogs = async () => {
    try {
      const allBlogs = await getAllBlogs()
      setQuery('')
      setBlogs(allBlogs)
    } catch (error) {
      console.error(`重置博客数据错误`, error)
    }
  }

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

      <Button
        type="button"
        variant={'secondary'}
        onClick={fetchBlogs}
        className="cursor-pointer"
      >
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={resetBlogs}
        className="cursor-pointer"
      >
        <RotateCw /> 重置
      </Button>

      <Link
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'cursor-pointer',
        )}
        href={`blog/edit`}
      >
        <Plus /> {`创建博客`}
      </Link>
    </section>
  )
}
