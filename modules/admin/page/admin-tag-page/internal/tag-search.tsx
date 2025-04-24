'use client'

import { getBlogTagsAndNoteTags, getQueryTags } from '@/actions/tags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTagLoader } from '@/hooks/use-tag-loader'
import { useModalStore } from '@/store/use-modal-store'
import { useTagStore } from '@/store/use-tag-store'
import { RotateCw, Search } from 'lucide-react'

export default function TagSearch() {
  const { setModalOpen } = useModalStore()
  const { setTags } = useTagStore()
  const { query, fetchTags, resetTags, setQuery } = useTagLoader(
    getBlogTagsAndNoteTags,
    getQueryTags,
    setTags,
  )

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
        onKeyDown={e => e.key === 'Enter' && fetchTags()}
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
        onClick={resetTags}
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
