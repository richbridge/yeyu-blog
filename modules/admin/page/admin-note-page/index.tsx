import { NoteSearch } from './internal/note-search'
import { getTagsOnNote } from '@/actions/notes'
import NoteListTable from './internal/note-list-table'
import { NoteTag } from '@prisma/client'
import { NoteTagItemToggle } from '@/components/shared/tag-item-toggle'
import { toast } from 'sonner'

export default function AdminNotePage() {
  return (
    <main className="w-full flex flex-col gap-2">
      <NoteSearch />
      <NoteTagsContainer />
      <NoteListTable />
    </main>
  )
}

async function NoteTagsContainer() {
  let tags: NoteTag['tagName'][] = []

  try {
    tags = (await getTagsOnNote()).map(v => v.tagName)
  } catch (error) {
    toast.error(`获取 tags 数据错误 ${error}`)
    console.error(`获取 tags 数据错误`, error)
  }

  return (
    <section className="w-full flex gap-2">
      {tags.map(tag => (
        <NoteTagItemToggle key={tag.toLowerCase()} tag={tag} />
      ))}
    </section>
  )
}
