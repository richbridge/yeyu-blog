import { prisma } from '@/db'
import { DataTable } from './data-table'
import { columns } from './tag-table-column'

export default async function TagListTable() {
  const blogTags = await prisma.blogTag.findMany({
    select: {
      tagType: true,
      tagName: true,
    },
  })
  const noteTags = await prisma.noteTag.findMany({
    select: {
      tagType: true,
      tagName: true,
    },
  })
  const allTags = [...blogTags, ...noteTags]

  return (
    <main className="h-full">
      <DataTable columns={columns} data={allTags} />
    </main>
  )
}
