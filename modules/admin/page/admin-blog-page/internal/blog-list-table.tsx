'use client'

import { DataTable } from './data-table'
import { columns } from './blog-table-column'
import { useBlogs } from '@/hooks/use-blogs'
import Loading from '@/components/shared/loading'

export default function BlogListTable() {
  const { blogs, loading, error } = useBlogs()

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
      <DataTable columns={columns} data={blogs} />
    </main>
  )
}
