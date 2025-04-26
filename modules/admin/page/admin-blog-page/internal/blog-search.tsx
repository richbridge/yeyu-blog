'use client'

import { getAllBlogs, getQueryBlogs } from '@/actions/blogs'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useBlogStore } from '@/store/use-blog-store'
import { useQueryLoader } from '@/hooks/use-query-loader'

export function BlogSearch() {
  const { setBlogs } = useBlogStore()
  const { query, fetchData, setQuery, resetData } = useQueryLoader(
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
        onKeyDown={e => e.key === 'Enter' && fetchData()}
      />

      <Button
        type="button"
        variant={'secondary'}
        onClick={fetchData}
        className="cursor-pointer"
      >
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={resetData}
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
