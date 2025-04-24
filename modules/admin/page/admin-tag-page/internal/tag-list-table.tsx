'use client'

import { DataTable } from './data-table'
import { columns } from './tag-table-column'
import { useTags } from '@/hooks/use-tags'
import Loading from '@/components/shared/loading'

export default function TagListTable() {
  const { tags, loading, error } = useTags()

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
      <DataTable columns={columns} data={tags} />
    </main>
  )
}
