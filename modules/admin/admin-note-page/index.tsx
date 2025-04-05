import { NoteSearch } from '@/components/shared/article-input'
import { NoteTagsContainer } from '@/components/shared/article-tags-container'
import NoteListTable from './internal/note-list-table'

export default function AdminNotePage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <NoteSearch />
      <NoteTagsContainer />
      <NoteListTable />
    </main>
  )
}
