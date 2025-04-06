import { useEchoStore } from '@/store/use-echo-store'
import { DataTable } from './data-table'
import { columns } from './echo-table-column'

export default function EchoListTable() {
  const { echos } = useEchoStore()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={echos} />
    </main>
  )
}
