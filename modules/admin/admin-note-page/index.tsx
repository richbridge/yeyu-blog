import { NoteSearch } from '@/components/shared/article-input'
import { NoteTagsContainer } from '@/components/shared/article-tags-container'
import { SelectedTagProvider } from '@/components/context/selected-tag'
import NoteListTable from './internal/note-list-table'

export default function AdminNotePage() {
  return (
    <SelectedTagProvider>
      <main className="w-full flex flex-col gap-2">
        <NoteSearch />
        <NoteTagsContainer />
        <NoteListTable />
      </main>
    </SelectedTagProvider>
  )
}
