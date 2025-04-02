'use client'

import { Blog } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'tags',
    header: '标签',
    cell: ({ row }) => {
      const tags = row.original.tags?.map(tag => tag.tag.tagName).join(' ')
      return <span>{tags || 'no tags'}</span>
    },
  },
  {
    accessorKey: 'isPublished',
    header: '是否发布',
  },
  {
    // * 需要格式化一下时间
    accessorKey: 'createdAt',
    header: '创建时间',
  },
]
