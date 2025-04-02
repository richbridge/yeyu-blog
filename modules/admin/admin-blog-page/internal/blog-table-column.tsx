'use client'

import { deleteBlogById, toggleArticlePublished } from '@/actions/blogs'
import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { Blog } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit2, Eye, Trash } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useBlogs } from '@/components/context/blog-context'

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
      const tags = row.original.tags?.map(tag => tag.tag.tagName)
      return (
        <div className="flex gap-1">
          {tags.map((tag, i) => (
            <TagItemBadge
              tag={tag}
              key={`${tag[i]?.toString()}+${i}+${tag.toString()}`}
            />
          ))}
        </div>
      )
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
  {
    accessorKey: 'actions',
    header: '操作',
    cell: ({ row, table }) => {
      const slug = row.original.slug
      const blogId = row.original.id
      const { setBlogs } = useBlogs()

      // * 后序再补一个 modal 框出来让点击确认
      const handleDeleteBlogById = async () => {
        try {
          await deleteBlogById(blogId)

          const newTables = table.options.data.filter(
            blog => blog.id !== blogId,
          )
          // const newTables = await getAllBlogs()
          setBlogs(newTables)
        } catch (error) {
          console.error(`删除 ${row.original.title} 出错~`, error)
        }
      }

      return (
        <section className="flex items-center gap-1">
          <Link
            href={`/blog/${slug}`}
            className={cn(
              buttonVariants({ variant: 'outline', className: 'size-8' }),
            )}
          >
            <Eye className="size-4" />
          </Link>
          <Button variant={'outline'} className="size-8">
            <Edit2 className="size-4" />
          </Button>
          <Button
            variant={'outline'}
            className="size-8"
            onClick={handleDeleteBlogById}
          >
            <Trash />
          </Button>
        </section>
      )
    },
  },
]
