'use client'

import { getAllEchos, getQueryEchos } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEchoStore } from '@/hooks/use-echo-store'
import { Plus, RotateCw, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export function EchoSearch() {
  const [query, setQuery] = useState('')
  const { setEchos } = useEchoStore()
  const [refresh, setRefresh] = useState(true)

  const fetchEchos = async () => {
    if (!query.trim()) return
    try {
      const echos = await getQueryEchos(query)
      setEchos(echos)
    } catch (error) {
      console.error(`获取博客数据错误`, error)
    }
  }

  // * 默认加载所有的数据, 先不考虑分页的事
  useEffect(() => {
    const fetchAllEchos = async () => {
      try {
        const echos = await getAllEchos()
        setEchos(echos)
      } catch (error) {
        console.error(`获取博客数据错误`, error)
      }
    }
    fetchAllEchos()
  }, [refresh])

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

      <Button
        variant={'secondary'}
        onClick={() => {
          console.log(1)
        }}
      >
        <Plus /> {`创建短语`}
      </Button>
    </section>
  )
}
