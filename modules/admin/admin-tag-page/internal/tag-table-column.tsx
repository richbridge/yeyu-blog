'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { BlogTag, NoteTag } from '@prisma/client'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { Badge } from '@/components/ui/badge'

// * 后序整一个分类排序
export const columns: ColumnDef<BlogTag | NoteTag>[] = [
  {
    accessorKey: 'tagName',
    header: '标签名',
    cell: ({ row }) => {
      return <TagItemBadge tag={row.original.tagName} />
    },
  },
  {
    accessorKey: 'tagType',
    header: '标签类型',
    cell: ({ row }) => {
      const tagType = row.original.tagType
      // * 后序整一个颜色
      return <Badge>{tagType}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: '操作',
  },
]
