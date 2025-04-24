'use client'

import { DataTable } from './data-table'
import { columns } from './note-table-column'
import { useNotes } from '@/hooks/use-notes'
import Loading from '@/components/shared/loading'

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
    <main className="h-full">
      <DataTable columns={columns} data={notes} />
    </main>
  )
}
