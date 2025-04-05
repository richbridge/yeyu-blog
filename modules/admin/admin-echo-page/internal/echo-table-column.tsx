'use client'

import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import { Echo } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit2, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

// * 标题, 来源, 是否发布, 创建时间, 操作
export const columns: ColumnDef<Echo>[] = [
  {
    accessorKey: 'content',
    header: '内容',
  },
  {
    accessorKey: 'reference',
    header: '来源',
    cell: ({ row }) => {
      const reference = row.original.reference.toString()
      return <span>{reference}</span>
    },
  },
  {
    accessorKey: 'isPublished',
    header: '是否发布',
    cell: ({ row }) => {
      // ! 后序再做性能优化
      const handleToggle = async () => {}

      return (
        <Switch
          onCheckedChange={handleToggle}
          checked={row.original.isPublished}
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
      // * 后序再补一个 modal 框出来让点击确认
      const handleArticleDelete = async () => {}

      return (
        <section className="flex items-center gap-1">
          {/* 查看直接使用那种变形对话框!!! */}
          <Button variant={'outline'} className="size-8">
            <Edit2 className="size-4" />
          </Button>
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
