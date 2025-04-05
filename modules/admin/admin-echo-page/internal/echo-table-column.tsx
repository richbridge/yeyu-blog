'use client'

import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { Echo } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit2, Eye, Trash } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { deleteNoteById, toggleArticlePublished } from '@/actions/notes'

// * 标题, 来源, 是否发布, 创建时间, 操作

export const columns: ColumnDef<Echo>[] = [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'isPublished',
    header: '是否发布',
    cell: ({ row }) => {
      const note = row.original
      const noteId = row.original.id
      // const { notes, setNotes } = useNotes()
      // ! 后序再做性能优化

      const handleToggle = async () => {
        // const newStatus = !note.isPublished
        // const preNotes = [...notes]
        // const updated = notes.map(item =>
        //   item.id === noteId ? { ...item, isPublished: newStatus } : item,
        // )
        // setNotes(updated)
        // try {
        //   await toggleArticlePublished(noteId, newStatus)
        // } catch (error) {
        //   // * 后序也整一个全局 Message 消息提醒出错~
        //   setNotes(preNotes)
        //   console.error('发布状态更新失败', error)
        // }
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
      // const { setNotes } = useNotes()
      // const { setModalOpen } = useModalStore()

      // * 后序再补一个 modal 框出来让点击确认
      const handleArticleDelete = async () => {
        try {
          await deleteNoteById(blogId)

          const newTables = table.options.data.filter(
            blog => blog.id !== blogId,
          )
          // setNotes(newTables)
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
              // setModalOpen('deleteArticleModal', handleArticleDelete)
            }}
          >
            <Trash />
          </Button>
        </section>
      )
    },
  },
]
