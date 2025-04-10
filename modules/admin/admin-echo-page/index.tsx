import { EchoSearch } from './internal/echo-search'
import EchoListTable from './internal/echo-list-table'
import { prisma } from '@/db'

export default async function AdminEchoPage() {
  const echos = await prisma.echo.findMany()

  return (
    <main className="w-full flex flex-col gap-2">
      <EchoSearch echos={echos} />
      <EchoListTable />
    </main>
  )
}
