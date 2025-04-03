import { NoteSearch } from '@/components/shared/article-input'
import { NotesProvider } from '@/components/context/note-context'
import { NoteTagsContainer } from '@/components/shared/article-tags-container'
import { SelectedTagProvider } from '@/components/context/selected-tag'

export default function AdminNotePage() {
  return (
    <SelectedTagProvider>
      <NotesProvider>
        <main className="w-full flex flex-col gap-2 bg-pink-600">
          <NoteSearch />
          <NoteTagsContainer />
          {/* <BlogListTable /> */}
        </main>
      </NotesProvider>
    </SelectedTagProvider>
  )
}
