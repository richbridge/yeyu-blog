'use client'

import { EchoSearch } from './internal/echo-search'
import EchoListTable from './internal/echo-list-table'
import { Echo } from '@prisma/client'
import { useEchoStore } from '@/store/use-echo-store'
import { useEffect } from 'react'

export default function AdminEchoPage({ echos }: { echos: Echo[] }) {
  const { setEchos } = useEchoStore()

  useEffect(() => {
    setEchos(echos)
  }, [echos])

  return (
    <main className="w-full flex flex-col gap-2">
      <EchoSearch />
      <EchoListTable />
    </main>
  )
}
