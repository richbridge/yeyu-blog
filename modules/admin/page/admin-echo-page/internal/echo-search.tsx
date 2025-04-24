'use client'

import { getAllEchos, getQueryEchos } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEchoStore } from '@/store/use-echo-store'
import { useModalStore } from '@/store/use-modal-store'
import { Echo } from '@prisma/client'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function EchoSearch() {
  const [query, setQuery] = useState('')
  const { setEchos } = useEchoStore()
  const { setModalOpen } = useModalStore()

  const load = async (fetchFn: () => Promise<Echo[]>, resetQuery = false) => {
    try {
      const data = await fetchFn()
      if (resetQuery) {
        setQuery('')
      }
      setEchos(data)
    } catch (error) {
      toast.error(resetQuery ? '重新加载 echo 数据出错~' : '获取 echo 数据错误')
    }
  }

  const fetchEchos = async () => {
    if (!query.trim()) {
      load(getAllEchos, true)
    } else {
      load(() => getQueryEchos(query))
    }
  }

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
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchEchos()
          }
        }}
      />

      <Button
        type="button"
        variant={'secondary'}
        onClick={fetchEchos}
        className="cursor-pointer"
      >
        <Search /> 搜索
      </Button>

      <Button
        variant={'secondary'}
        onClick={() => load(getAllEchos, true)}
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
