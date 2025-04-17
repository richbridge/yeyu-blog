import { NoteSearch } from './internal/note-search'
import NoteListTable from './internal/note-list-table'
import { NoteTagsContainer } from './internal/note-tags-container'

export default function AdminNotePage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <NoteSearch />
      <NoteTagsContainer />
      <NoteListTable />
    </main>
  )
}
