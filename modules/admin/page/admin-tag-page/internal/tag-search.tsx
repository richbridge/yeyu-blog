'use client'

import { getBlogTagsAndNoteTags, getQueryTags } from '@/actions/tags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/store/use-modal-store'
import { useTagStore } from '@/store/use-tag-store'
import { RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function TagSearch() {
  const { setModalOpen } = useModalStore()
  const { setTags } = useTagStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getBlogTagsAndNoteTags().then(setTags)
  }, [])

  const fetchTags = async () => {
    if (!query.trim()) {
      return await loadAllTags()
    }
    try {
      const tags = await getQueryTags(query)
      console.log(tags, 'tags')
      setTags(tags)
    } catch (error) {
      toast.error(`获取标签数据错误 ${error}`)
      console.error(`获取标签数据错误`, error)
    }
  }

  const loadAllTags = async () => {
    try {
      const allTags = await getBlogTagsAndNoteTags()
      setQuery('')
      setTags(allTags)
    } catch (error) {
      console.error(`获取标签错误`, error)
    }
  }

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
        type="button"
        variant={'secondary'}
        onClick={fetchTags}
        className="cursor-pointer"
      >
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={loadAllTags}
        className="cursor-pointer"
      >
        <RotateCw /> 重置
      </Button>
      <Button
        variant={'secondary'}
        onClick={() => {
          setModalOpen('createTagModal')
        }}
        className="cursor-pointer"
      >
        新建标签
      </Button>
    </div>
  )
}
