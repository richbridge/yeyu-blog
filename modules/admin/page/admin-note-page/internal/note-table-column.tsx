'use client'

import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { ColumnDef } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Edit2,
  Eye,
  Trash,
  CalendarDays,
  TagIcon,
  TypeIcon,
  Wrench,
} from 'lucide-react'
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
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <TypeIcon className="size-4" />
          标题
        </span>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <TagIcon className="size-4" />
          标签
        </span>
      )
    },
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
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Eye className="size-4" />
          是否发布
        </span>
      )
    },
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
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          size={'sm'}
          className="cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          <CalendarDays className="size-4" />
          创建时间
        </Button>
      )
    },
    cell: ({ row }) => {
      const prettyTime = prettyDateTime(row.original.createdAt)
      return <span>{prettyTime}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Wrench className="size-4" />
          操作
        </span>
      )
    },
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
