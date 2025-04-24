'use client'

import Loading from '@/components/shared/loading'
import { DataTable } from './data-table'
import { columns } from './echo-table-column'
import { useEchos } from '@/hooks/use-echos'

export default function EchoListTable() {
  const { echos, loading, error } = useEchos()

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        加载出错...
      </div>
    )
  }

  return (
    <main className="h-full">
      <DataTable columns={columns} data={echos} />
    </main>
  )
}
