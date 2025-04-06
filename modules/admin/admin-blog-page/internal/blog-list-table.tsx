'use client'

import { DataTable } from './data-table'
import { columns } from './blog-table-column'
import { useBlogStore } from '@/store/use-blog-store'

export default function BlogListTable() {
  const { blogs } = useBlogStore()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={blogs} />
    </main>
  )
}
