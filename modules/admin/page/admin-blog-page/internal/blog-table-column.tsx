'use client'

import {
  deleteBlogById,
  toggleBlogPublishedById,
  WithTagsBlog,
} from '@/actions/blogs'
import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { ColumnDef } from '@tanstack/react-table'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit2, Eye, Trash } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useModalStore } from '@/store/use-modal-store'
import { useBlogStore } from '@/store/use-blog-store'
import { toast } from 'sonner'
import { useTransition } from 'react'

export const columns: ColumnDef<WithTagsBlog>[] = [
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
      const blog = row.original

      return (
        <PublishToggleSwitch
          blogId={blog.id}
          isPublished={blog.isPublished}
          slug={blog.slug}
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
      return <time>{prettyTime}</time>
    },
  },
  {
    accessorKey: 'actions',
    header: '操作',
    cell: ({ row, table }) => {
      const { id, slug, title } = row.original
      const blogs = table.options.data
      const { setBlogs } = useBlogStore()

      return (
        <ActionButtons
          blogId={id}
          slug={slug}
          title={title}
          blogsData={blogs}
          onUpdateBlogs={setBlogs}
        />
      )
    },
  },
]

function PublishToggleSwitch({
  blogId,
  isPublished,
  slug,
}: {
  blogId: number
  isPublished: boolean
  slug: string
}) {
  const { setBlogs, blogs } = useBlogStore()
  const [isPending, startTransition] = useTransition()

  const handleToggle = async () => {
    const newStatus = !isPublished
    const preBlogs = [...blogs]

    const updated = blogs.map(item =>
      item.id === blogId ? { ...item, isPublished: newStatus } : item,
    )
    setBlogs(updated)

    startTransition(async () => {
      try {
        await toggleBlogPublishedById(blogId, newStatus)
      } catch (error) {
        setBlogs(preBlogs)
        toast.error('发布状态更新失败')
        console.error(error)
      }
    })
  }

  return (
    <Switch
      onCheckedChange={handleToggle}
      checked={isPublished}
      disabled={isPending}
      key={slug}
    />
  )
}

function ActionButtons({
  blogId,
  slug,
  title,
  blogsData,
  onUpdateBlogs,
}: {
  blogId: number
  slug: string
  title: string
  blogsData: WithTagsBlog[]
  onUpdateBlogs: (blogs: WithTagsBlog[]) => void
}) {
  const { setModalOpen } = useModalStore()

  const handleDelete = async () => {
    try {
      await deleteBlogById(blogId)
      const filtered = blogsData.filter(blog => blog.id !== blogId)
      onUpdateBlogs(filtered)
    } catch (error) {
      toast.error(`删除 ${title} 出错~ ${error}`)
      console.error(`删除 ${title} 出错~`, error)
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
        <span className="sr-only">查看</span>
      </Link>
      <Link
        href={`/blog/edit/${slug}`}
        className={cn(
          buttonVariants({ variant: 'outline', className: 'size-8' }),
        )}
      >
        <Edit2 className="size-4" />
        <span className="sr-only">编辑</span>
      </Link>
      <Button
        variant="outline"
        className="size-8"
        onClick={() => setModalOpen('deleteArticleModal', handleDelete)}
      >
        <Trash className="size-4" />
        <span className="sr-only">删除</span>
      </Button>
    </section>
  )
}
