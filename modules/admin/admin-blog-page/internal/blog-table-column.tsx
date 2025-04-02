'use client'

import { toggleArticlePublished } from '@/actions/blogs'
import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import { Blog } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

type withTags = Blog & {
  tags: {
    tag: {
      tagName: string
    }
  }[]
}

export const columns: ColumnDef<withTags>[] = [
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
    cell: ({ row, table }) => {
      const [isPublished, setIsPublished] = useState(row.original.isPublished)
      const blogId = row.original.id

      const findBlogItemById = (id: number, t = table) => {
        return t.options.data.find(item => item.id === blogId)
      }

      const handleToggle = async () => {
        const newStatus = !isPublished
        // * 先直接修改 UI, 有问题再改回来~
        setIsPublished(newStatus)

        try {
          await toggleArticlePublished(blogId, newStatus)

          const blogItem = findBlogItemById(blogId)
          if (blogItem) blogItem.isPublished = newStatus
        } catch (error) {
          setIsPublished(!newStatus)

          const blogItem = findBlogItemById(blogId)
          if (blogItem) blogItem.isPublished = !newStatus

          // * 后序也整一个全局 Message 消息提醒出错~
          console.error('发布状态更新失败', error)
        }
      }

      return (
        <Switch onCheckedChange={handleToggle} checked={isPublished}>
          {isPublished}
        </Switch>
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
]
