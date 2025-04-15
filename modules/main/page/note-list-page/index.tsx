import { prisma } from '@/db'
import NoteListItem from './internal/note-list-item'
import { notFound } from 'next/navigation'

export default async function NoteListPage() {
  const allNotes = await prisma.note.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  if (allNotes.length === 0) {
    // * 后序应该统一处理, 不应该直接 notFound ...
    notFound()
  }

  return (
    <main className="flex flex-col p-2">
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
