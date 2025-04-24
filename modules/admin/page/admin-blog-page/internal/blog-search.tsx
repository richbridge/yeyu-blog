'use client'

import { getAllBlogs, getQueryBlogs } from '@/actions/blogs'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useBlogStore } from '@/store/use-blog-store'
import { useBlogLoader } from '@/hooks/use-blog-loader'

export function BlogSearch() {
  const { setBlogs } = useBlogStore()
  const { query, fetchBlogs, setQuery, resetNotes } = useBlogLoader(
    getAllBlogs,
    getQueryBlogs,
    setBlogs,
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
          setQuery(value)
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
        href={`blog/edit`}
      >
        <Plus /> {`创建博客`}
      </Link>
    </section>
  )
}
