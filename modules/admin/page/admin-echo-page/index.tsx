import EchoListTable from './internal/echo-list-table'
import { EchoSearch } from './internal/echo-search'

export default async function AdminEchoPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <EchoSearch />
      <EchoListTable />
    </main>
  )
}
