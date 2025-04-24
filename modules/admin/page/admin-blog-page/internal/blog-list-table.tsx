'use client'

import { DataTable } from './data-table'
import { columns } from './blog-table-column'
import { useBlogs } from '@/hooks/use-blogs'
import Loading from '@/components/shared/loading'
import { motion } from 'motion/react'

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
      <DataTable columns={columns} data={blogs} />
    </motion.main>
  )
}
