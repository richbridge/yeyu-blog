'use client'

import { getBlogs } from '@/actions/blogs'
import { useBlogs } from '@/components/context/blog-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useState } from 'react'

export default function ArticleInput({
  createType,
}: {
  createType: '博客' | '笔记'
}) {
  const [query, setQuery] = useState('')
  const { setBlogs } = useBlogs()

  const fetchBlogs = async () => {
    if (!query.trim()) return
    try {
      const blogs = await getBlogs(query)
      setBlogs(blogs)
    } catch (error) {
      console.error(`获取${createType}数据错误`, error)
    }
  }

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入标题喵~"
        className="w-1/4"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchBlogs()
          }
        }}
      />

      <Button type="button" variant={'secondary'} onClick={fetchBlogs}>
        <Search /> 搜索
      </Button>

      <Button variant={'secondary'} onClick={() => setQuery('')}>
        <RotateCw /> 重置
      </Button>

      <Button variant={'secondary'}>
        <Plus /> {`创建${createType}`}
      </Button>
    </section>
  )
}
