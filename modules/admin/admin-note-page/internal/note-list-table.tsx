'use client'

import { useNotes } from '@/components/context/note-context'
import { DataTable } from './data-table'
import { columns } from './note-table-column'

export default function NoteListTable() {
  const { notes } = useNotes()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={notes} />
    </main>
  )
}
