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
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Edit2,
  Eye,
  TagIcon,
  Trash,
  TypeIcon,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useModalStore } from '@/store/use-modal-store'
import { useBlogStore } from '@/store/use-blog-store'
import { toast } from 'sonner'
import { useTransition } from 'react'

export const columns: ColumnDef<WithTagsBlog>[] = [
  {
    accessorKey: 'title',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <TypeIcon className="size-4" />
          标题
        </span>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <TagIcon className="size-4" />
          标签
        </span>
      )
    },
    cell: ({ row }) => {
      const tags = row.original.tags

      return (
        <div className="flex gap-1">
          {tags.map((tag, i) => (
            <TagItemBadge tag={tag.tagName} key={tag.id} />
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'isPublished',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <Eye className="size-4" />
          是否发布
        </span>
      )
    },
    cell: ({ row }) => {
      const blog = row.original

      return (
        <PublishToggleSwitch blogId={blog.id} isPublished={blog.isPublished} />
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

      return (
        <Button
          variant={'ghost'}
          size={'sm'}
          className="cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          <CalendarDays className="size-4" />
          创建时间
          {sorted === 'asc' ? (
            <ArrowUp />
          ) : sorted === 'desc' ? (
            <ArrowDown />
          ) : null}
        </Button>
      )
    },
    cell: ({ row }) => {
      const prettyTime = prettyDateTime(row.original.createdAt)
      return <time>{prettyTime}</time>
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <Wrench className="size-4" />
          操作
        </span>
      )
    },
    cell: ({ row }) => {
      const { id, slug, title } = row.original

      return <ActionButtons blogId={id} slug={slug} title={title} />
    },
  },
]

function PublishToggleSwitch({
  blogId,
  isPublished,
}: {
  blogId: number
  isPublished: boolean
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
        toast.success(`更新成功`)
      } catch (error) {
        setBlogs(preBlogs)
        toast.error(`发布状态更新失败`)
      }
    })
  }

  return (
    <Switch
      onCheckedChange={handleToggle}
      checked={isPublished}
      disabled={isPending}
    />
  )
}

function ActionButtons({
  blogId,
  slug,
  title,
}: {
  blogId: number
  slug: string
  title: string
}) {
  const { setModalOpen } = useModalStore()
  const { blogs, setBlogs } = useBlogStore()

  const handleDelete = async () => {
    try {
      await deleteBlogById(blogId)
      const filtered = blogs.filter(blog => blog.id !== blogId)
      setBlogs(filtered)
    } catch (error) {
      toast.error(`删除 ${title} 出错~`)
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
      <Link
        href={`blog/edit/${slug}`}
        className={cn(
          buttonVariants({ variant: 'outline', className: 'size-8' }),
        )}
      >
        <Edit2 className="size-4" />
      </Link>
      <Button
        variant="outline"
        className="size-8 text-red-600"
        onClick={() => setModalOpen('deleteArticleModal', handleDelete)}
      >
        <Trash className="size-4" />
      </Button>
    </section>
  )
}
