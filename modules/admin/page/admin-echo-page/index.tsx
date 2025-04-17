import { EchoSearch } from './internal/echo-search'
import EchoListTable from './internal/echo-list-table'

export default async function AdminEchoPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <EchoSearch />
      <EchoListTable />
    </main>
  )
}
