'use client'

import { getAllEchos, getQueryEchos } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEchoStore } from '@/store/use-echo-store'
import { useModalStore } from '@/store/use-modal-store'
import { Echo } from '@prisma/client'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export function EchoSearch({ echos }: { echos: Echo[] }) {
  const [query, setQuery] = useState('')
  const { setEchos } = useEchoStore()
  const { setModalOpen } = useModalStore()

  useEffect(() => {
    setEchos(echos)
  }, [echos])

  const fetchEchos = async () => {
    if (!query.trim()) return
    try {
      const echos = await getQueryEchos(query)
      setEchos(echos)
    } catch (error) {
      console.error(`获取短语数据错误`, error)
    }
  }

  const resetEchos = async () => {
    try {
      const allEchos = await getAllEchos()
      setQuery('')
      setEchos(allEchos)
    } catch (error) {
      console.error(`重置短语数据错误`, error)
    }
  }

  return (
    <section className="flex w-full gap-4">
      <Input
        placeholder="请输入短语喵~"
        className="w-1/4"
        value={query}
        onChange={e => {
          if (e.target.value === ' ') return
          setQuery(e.target.value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            fetchEchos()
          }
        }}
      />

      <Button type="button" variant={'secondary'} onClick={fetchEchos}>
        <Search /> 搜索
      </Button>

      <Button variant={'secondary'} onClick={resetEchos}>
        <RotateCw /> 重置
      </Button>

      <Button
        variant={'secondary'}
        onClick={() => {
          setModalOpen('createEchoModal')
        }}
      >
        <Plus /> {`创建短语`}
      </Button>
    </section>
  )
}
