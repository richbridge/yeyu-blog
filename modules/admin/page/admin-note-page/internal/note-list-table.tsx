'use client'

import { getAllNotes } from '@/actions/notes'
import Loading from '@/components/shared/loading'
import { useStoreLoader } from '@/hooks/use-store-loader'
import { useNoteStore } from '@/store/use-note-store'
import { motion } from 'motion/react'
import { DataTable } from './data-table'
import { columns } from './note-table-column'

export default function NoteListTable() {
  const { notes, setNotes } = useNoteStore()
  const { data, error, loading } = useStoreLoader(getAllNotes, setNotes, notes)

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
