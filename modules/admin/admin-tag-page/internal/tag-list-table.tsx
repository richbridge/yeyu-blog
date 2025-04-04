import { DataTable } from './data-table'
import { columns } from './tag-table-column'
import { getBlogTagsAndNoteTags } from '@/actions/tags'

export default async function TagListTable() {
  const allTags = await getBlogTagsAndNoteTags()

  return (
    <main className="h-full">
      <DataTable columns={columns} data={allTags} />
    </main>
  )
}
