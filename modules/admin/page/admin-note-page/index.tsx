import { NoteSearch } from './internal/note-search'
import NoteListTable from './internal/note-list-table'
import { NoteTagsContainer } from './internal/note-tags-container'
import { getTagsOnNote } from '@/actions/notes'

export default async function AdminNotePage() {
  const allTagsOnNote = (await getTagsOnNote()).map(v => v.tagName)

  return (
    <main className="w-full flex flex-col gap-2">
      <NoteSearch />
      <NoteTagsContainer tags={allTagsOnNote} />
      <NoteListTable />
    </main>
  )
}
