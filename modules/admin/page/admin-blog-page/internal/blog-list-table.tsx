'use client'

import { DataTable } from './data-table'
import { columns } from './blog-table-column'
import Loading from '@/components/shared/loading'
import { motion } from 'motion/react'
import { useStoreLoader } from '@/hooks/use-store-loader'
import { getAllBlogs } from '@/actions/blogs'
import { useBlogStore } from '@/store/use-blog-store'

export default function BlogListTable() {
  const { blogs, setBlogs } = useBlogStore()
  const { data, error, loading } = useStoreLoader(getAllBlogs, setBlogs, blogs)

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
    <motion.main
      className="h-full"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
    >
      <DataTable columns={columns} data={data} />
    </motion.main>
  )
}
