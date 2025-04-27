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
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { deleteNoteById, toggleNotePublishedById } from '@/actions/notes'
import { useModalStore } from '@/store/use-modal-store'
import { useNoteStore, WithTagsNote } from '@/store/use-note-store'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { requireAdmin } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<WithTagsNote>[] = [
  {
    accessorKey: 'title',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
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
        <span className="flex gap-1 items-center">
          <TagIcon className="size-4" />
          标签
        </span>
      )
    },
    cell: ({ row }) => {
      const tags = row.original.tags
      return (
        <div className="flex gap-1 items-center">
          {tags.map(tag => (
            <TagItemBadge tag={tag.tagName} key={tag.id} />
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'isPublished',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
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
          key={note.id}
        />
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

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
          {sorted === 'asc' ? (
            <ArrowUp />
          ) : sorted === 'desc' ? (
            <ArrowDown />
          ) : null}
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
        <span className="flex gap-1 items-center">
          <Wrench className="size-4" />
          操作
        </span>
      )
    },
    cell: ({ row }) => {
      const { id, slug, title } = row.original

      return <ActionButtons noteId={id} slug={slug} title={title} />
    },
  },
]

function PublishToggleSwitch({
  noteId,
  isPublished,
}: {
  noteId: number
  isPublished: boolean
}) {
  const { notes, setNotes } = useNoteStore()
  const [isPending, startTransition] = useTransition()

  const handleToggle = async () => {
    const newStatus = !isPublished
    const preNotes = [...notes]

    const updated = notes.map(item =>
      item.id === noteId ? { ...item, isPublished: newStatus } : item,
    )
    setNotes(updated)

    startTransition(async () => {
      try {
        await toggleNotePublishedById(noteId, newStatus)
        toast.success(`更新成功`)
      } catch (error) {
        setNotes(preNotes)
        if (error instanceof Error) {
          toast.error(`发布状态更新失败 ${error?.message}`)
        } else {
          toast.error(`发布状态更新失败`)
        }
      }
    })
  }

  return (
    <Switch
      onCheckedChange={handleToggle}
      checked={isPublished}
      disabled={isPending}
    />
  )
}

function ActionButtons({
  noteId,
  slug,
  title,
}: {
  noteId: number
  slug: string
  title: string
}) {
  const { setModalOpen } = useModalStore()
  const { setNotes, notes } = useNoteStore()
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteNoteById(noteId)
      const filtered = notes.filter(blog => blog.id !== noteId)
      setNotes(filtered)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`删除 「${title}」 出错~ ${error?.message}`)
      } else {
        toast.error(`删除 「${title}」 出错~`)
      }
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
        onClick={async e => {
          e.preventDefault()
          try {
            await requireAdmin()
            router.push(`note/edit/${slug}`)
          } catch (error) {
            toast.error(`权限不够哦~`)
          }
        }}
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
