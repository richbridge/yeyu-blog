import TagListTable from './internal/tag-list-table'
import TagSearch from './internal/tag-search'

export default function AdminTagPage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <TagSearch />
      <TagListTable />
    </main>
  )
}
