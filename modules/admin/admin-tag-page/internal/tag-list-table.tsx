'use client'

import { useTagStore } from '@/store/use-tag-store'
import { DataTable } from './data-table'
import { columns } from './tag-table-column'

export default function TagListTable() {
  const { tags } = useTagStore()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={tags} />
    </main>
  )
}
