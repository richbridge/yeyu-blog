'use client'

import { getQueryTags } from '@/actions/tags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/store/use-modal-store'
import { Tags, useTagStore } from '@/store/use-tag-store'
import { RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function TagSearch({ tags }: { tags: Tags }) {
  const { setModalOpen } = useModalStore()
  const { setTags } = useTagStore()
  const [query, setQuery] = useState('')
  const [refresh, setRefresh] = useState(true)

  const fetchTags = async () => {
    if (!query.trim()) return
    try {
      const tags = await getQueryTags(query)
      console.log(tags, 'tags')
      setTags(tags)
    } catch (error) {
      console.error(`获取博客数据错误`, error)
    }
  }

  // * 默认加载所有的数据, 先不考虑分页的事
  useEffect(() => {
    setTags(tags)
  }, [refresh])

  return (
    <div className="flex gap-2">
      <Input
        className="w-1/4"
        placeholder="请输入标签名喵~"
        value={query}
        onChange={e => {
          if (e.target.value === ' ') return
          setQuery(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchTags()
          }
        }}
      />
      <Button
        onClick={() => {
          setModalOpen('createTagModal')
        }}
      >
        新建标签
      </Button>
      <Button type="button" variant={'secondary'} onClick={fetchTags}>
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={() => {
          setQuery('')
          setRefresh(!refresh)
        }}
      >
        <RotateCw /> 重置
      </Button>
    </div>
  )
}
