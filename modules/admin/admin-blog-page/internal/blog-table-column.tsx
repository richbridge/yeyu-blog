'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { blogItem } from './blog-list-table'

export const columns: ColumnDef<blogItem>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'title',
    header: '标题',
  },
  {
    accessorKey: 'tag',
    header: '标签',
  },
  {
    accessorKey: 'isPublish',
    header: '是否发布',
  },
]
