'use client'

import { getAllEchos, getQueryEchos } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEchoStore } from '@/store/use-echo-store'
import { useModalStore } from '@/store/use-modal-store'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function EchoSearch() {
  const [query, setQuery] = useState('')
  const { setEchos } = useEchoStore()
  const { setModalOpen } = useModalStore()

  useEffect(() => {
    getAllEchos().then(setEchos)
  }, [])

  const fetchEchos = async () => {
    if (!query.trim()) {
      return await loadAllEchos()
    }
    try {
      const echos = await getQueryEchos(query)
      setEchos(echos)
    } catch (error) {
      toast.error(`获取 echo 数据错误 ${error}`)
      console.error(`获取 echo 数据错误`, error)
    }
  }

  const loadAllEchos = async () => {
    try {
      const allEchos = await getAllEchos()
      setQuery('')
      setEchos(allEchos)
    } catch (error) {
      toast.error(`重置 echo 数据错误 ${error}`)
      console.error(`重置 echo 数据错误`, error)
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
        onClick={loadAllEchos}
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
