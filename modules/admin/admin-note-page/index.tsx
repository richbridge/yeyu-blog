import { NoteSearch } from '@/components/shared/article-input'
import { NotesProvider } from '@/components/context/note-context'

export default function AdminNotePage() {
  return (
    //   <SelectedTagProvider>
    <NotesProvider>
      <main className="w-full flex flex-col gap-2 bg-pink-600">
        <NoteSearch />
        {/* <ArticleTagsContainer /> */}
        {/* <BlogListTable /> */}
      </main>
    </NotesProvider>
    //   </SelectedTagProvider>
  )
}
