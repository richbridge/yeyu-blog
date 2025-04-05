'use client'

import { DataTable } from './data-table'
import { columns } from './echo-table-column'

export default function EchoListTable() {
  // const { notes } = useNotes()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={{}} />
    </main>
  )
}
