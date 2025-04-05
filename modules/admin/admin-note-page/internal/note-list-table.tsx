'use client'

import { useNoteStore } from '@/hooks/use-note-store'
import { DataTable } from './data-table'
import { columns } from './note-table-column'

export default function NoteListTable() {
  const { notes } = useNoteStore()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={notes} />
    </main>
  )
}
