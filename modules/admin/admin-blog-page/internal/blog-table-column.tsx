'use client'

import { Blog } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'tag',
    header: '标签',
  },
  {
    accessorKey: 'isPublished',
    header: '是否发布',
  },
]
