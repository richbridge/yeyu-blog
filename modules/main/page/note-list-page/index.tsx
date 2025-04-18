import NoteListItem from './internal/note-list-item'
import { getAllShowNotes } from '@/actions/notes'

export default async function NoteListPage() {
  const allNotes = await getAllShowNotes()

  if (allNotes.length === 0) {
    return (
      <main className="flex flex-col min-h-[85vh]">
        <p className="m-auto">虚无。</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col p-2 min-h-[85vh]">
      {/* 使用时间排序, 最新的在上面 */}
      {allNotes.map((v, i) => (
        <NoteListItem
          key={i}
          noteTitle={v.title}
          createdAt={v.createdAt}
          slug={v.slug}
        />
      ))}
    </main>
  )
}
