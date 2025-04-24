'use client'

import { DataTable } from './data-table'
import { columns } from './note-table-column'
import { useNotes } from '@/hooks/use-notes'
import Loading from '@/components/shared/loading'
import { motion } from 'motion/react'

export default function NoteListTable() {
  const { notes, loading, error } = useNotes()

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
      <DataTable columns={columns} data={notes} />
    </motion.main>
  )
}
