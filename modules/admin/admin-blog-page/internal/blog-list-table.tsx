'use client'

import { DataTable } from './data-table'
import { columns } from './blog-table-column'
import { useBlogs } from '@/components/context/blog-context'

export default function BlogListTable() {
  const { blogs } = useBlogs()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={blogs} />
    </main>
  )
}
