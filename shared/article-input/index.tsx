'use client'

import { getAllBlogs, getQueryBlogs } from '@/actions/blogs'
import { useBlogs } from '@/components/context/blog-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ArticleInput({
  createType,
}: {
  createType: '博客' | '笔记'
}) {
  const [query, setQuery] = useState('')
  const { setBlogs } = useBlogs()
  const [refresh, setRefresh] = useState(true)

  const fetchBlogs = async () => {
    if (!query.trim()) return
    try {
      const blogs = await getQueryBlogs(query)
      setBlogs(blogs)
    } catch (error) {
      console.error(`获取${createType}数据错误`, error)
    }
  }

  // * 默认加载所有的数据, 先不考虑分页的事
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const blogs = await getAllBlogs()
        setBlogs(blogs)
      } catch (error) {
        console.error(`获取${createType}数据错误`, error)
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

      <Button variant={'secondary'}>
        <Plus /> {`创建${createType}`}
      </Button>
    </section>
  )
}
