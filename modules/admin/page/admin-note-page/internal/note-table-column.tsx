'use client'

import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { ColumnDef } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit2, Eye, Trash } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { deleteNoteById, toggleNotePublishedById } from '@/actions/notes'
import { useModalStore } from '@/store/use-modal-store'
import { useNoteStore, WithTagsNote } from '@/store/use-note-store'
import { useTransition } from 'react'
import { toast } from 'sonner'

export const columns: ColumnDef<WithTagsNote>[] = [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'tags',
    header: '标签',
    cell: ({ row }) => {
      const tags = row.original.tags
      return (
        <div className="flex gap-1">
          {tags.map((tag, i) => (
            <TagItemBadge
              tag={tag.tagName}
              key={`${tag.id}+${i}+${tag.toString()}`}
            />
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'isPublished',
    header: '是否发布',
    cell: ({ row }) => {
      const note = row.original

      return (
        <PublishToggleSwitch
          noteId={note.id}
          isPublished={note.isPublished}
          slug={note.slug}
        />
      )
    },
  },
  {
    // * 需要格式化一下时间, 并且需要排序
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          创建时间
        </span>
      )
    },
    cell: ({ row }) => {
      const prettyTime = prettyDateTime(row.original.createdAt)
      return <span>{prettyTime}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: '操作',
    cell: ({ row, table }) => {
      const { id, slug, title } = row.original
      const notes = table.options.data
      const { setNotes } = useNoteStore()

      return (
        <ActionButtons
          noteId={id}
          slug={slug}
          title={title}
          notesData={notes}
          onUpdateBlogs={setNotes}
        />
      )
    },
  },
]

function PublishToggleSwitch({
  noteId,
  isPublished,
  slug,
}: {
  noteId: number
  isPublished: boolean
  slug: string
}) {
  const { notes, setNotes } = useNoteStore()
  const [isPending, startTransition] = useTransition()

  const handleToggle = async () => {
    const newStatus = !isPublished
    const preBlogs = [...notes]

    const updated = notes.map(item =>
      item.id === noteId ? { ...item, isPublished: newStatus } : item,
    )
    setNotes(updated)

    startTransition(async () => {
      try {
        await toggleNotePublishedById(noteId, newStatus)
      } catch (error) {
        setNotes(preBlogs)
        toast.error('发布状态更新失败')
        console.error(error)
      }
    })
  }

  return (
    <Switch
      onCheckedChange={handleToggle}
      checked={isPublished}
      disabled={isPending}
      key={slug}
    />
  )
}

function ActionButtons({
  noteId,
  slug,
  title,
  notesData,
  onUpdateBlogs,
}: {
  noteId: number
  slug: string
  title: string
  notesData: WithTagsNote[]
  onUpdateBlogs: (blogs: WithTagsNote[]) => void
}) {
  const { setModalOpen } = useModalStore()

  const handleDelete = async () => {
    try {
      await deleteNoteById(noteId)
      const filtered = notesData.filter(blog => blog.id !== noteId)
      onUpdateBlogs(filtered)
    } catch (error) {
      toast.error(`删除 ${title} 出错~ ${error}`)
      console.error(`删除 ${title} 出错~`, error)
    }
  }

  return (
    <section className="flex items-center gap-1">
      <Link
        href={`/note/${slug}`}
        className={cn(
          buttonVariants({ variant: 'outline', className: 'size-8' }),
        )}
      >
        <Eye className="size-4" />
      </Link>
      <Link
        href={`note/edit/${slug}`}
        className={cn(
          buttonVariants({ variant: 'outline', className: 'size-8' }),
        )}
      >
        <Edit2 className="size-4" />
      </Link>
      <Button
        variant={'outline'}
        className="size-8 text-red-600"
        onClick={() => {
          setModalOpen('deleteArticleModal', handleDelete)
        }}
      >
        <Trash />
      </Button>
    </section>
  )
}
