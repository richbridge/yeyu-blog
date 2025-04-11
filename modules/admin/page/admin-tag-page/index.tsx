import { getBlogTagsAndNoteTags } from '@/actions/tags'
import TagListTable from './internal/tag-list-table'
import TagSearch from './internal/tag-search'

export default async function AdminTagPage() {
  const allTags = await getBlogTagsAndNoteTags()

  return (
    <main className="w-full flex flex-col gap-2">
      <TagSearch tags={allTags} />
      <TagListTable />
    </main>
  )
}
