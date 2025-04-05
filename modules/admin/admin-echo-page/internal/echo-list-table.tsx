import { DataTable } from './data-table'
import { columns } from './echo-table-column'
import { prisma } from '@/db'

export default async function EchoListTable() {
  const echos = await prisma.echo.findMany()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={echos} />
    </main>
  )
}
