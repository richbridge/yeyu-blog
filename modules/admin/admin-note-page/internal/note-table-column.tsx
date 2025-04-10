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
      const noteId = row.original.id
      const { notes, setNotes } = useNoteStore()
      // ! 后序再做性能优化

      const handleToggle = async () => {
        const newStatus = !note.isPublished

        const preNotes = [...notes]

        const updated = notes.map(item =>
          item.id === noteId ? { ...item, isPublished: newStatus } : item,
        )

        setNotes(updated)

        try {
          await toggleNotePublishedById(noteId, newStatus)
        } catch (error) {
          // * 后序也整一个全局 Message 消息提醒出错~
          setNotes(preNotes)
          console.error('发布状态更新失败', error)
        }
      }

      return (
        <Switch
          onCheckedChange={handleToggle}
          checked={row.original.isPublished}
          key={`${row.original.id}-${row.original.slug}`}
        />
      )
    },
  },
  {
    // * 需要格式化一下时间, 并且需要排序
    accessorKey: 'createdAt',
    header: '创建时间',
    cell: ({ row }) => {
      const prettyTime = prettyDateTime(row.original.createdAt)
      return <span>{prettyTime}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: '操作',
    cell: ({ row, table }) => {
      const slug = row.original.slug
      const blogId = row.original.id
      const { setNotes } = useNoteStore()
      const { setModalOpen } = useModalStore()

      // * 后序再补一个 modal 框出来让点击确认
      const handleArticleDelete = async () => {
        try {
          await deleteNoteById(blogId)

          const newTables = table.options.data.filter(
            blog => blog.id !== blogId,
          )
          setNotes(newTables)
        } catch (error) {
          console.error(`删除 ${row.original.title} 出错~`, error)
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
            className="size-8"
            onClick={() => {
              setModalOpen('deleteArticleModal', handleArticleDelete)
            }}
          >
            <Trash />
          </Button>
        </section>
      )
    },
  },
]
