'use client'

import { getAllEchos, getQueryEchos } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryLoader } from '@/hooks/use-query-loader'
import { useEchoStore } from '@/store/use-echo-store'
import { useModalStore } from '@/store/use-modal-store'
import { Plus, RotateCw, Search } from 'lucide-react'

export function EchoSearch() {
  const { setEchos } = useEchoStore()
  const { query, setQuery, fetchData, resetData } = useQueryLoader(
    getAllEchos,
    getQueryEchos,
    setEchos,
  )
  const { setModalOpen } = useModalStore()

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入引用喵~"
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

      <Button
        className="cursor-pointer"
        variant={'secondary'}
        onClick={() => {
          setModalOpen('createEchoModal')
        }}
      >
        <Plus />
        创建引用
      </Button>
    </section>
  )
}
