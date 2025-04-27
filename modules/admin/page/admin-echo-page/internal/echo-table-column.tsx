'use client'

import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import { Echo } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  Edit2,
  Eye,
  Quote,
  Trash,
  TypeIcon,
  Wrench,
} from 'lucide-react'
import { useEchoStore } from '@/store/use-echo-store'
import { deleteEchoById, toggleEchoPublishedById } from '@/actions/echos'
import { useModalStore } from '@/store/use-modal-store'
import { toast } from 'sonner'
import { useTransition } from 'react'

export const columns: ColumnDef<Echo>[] = [
  {
    accessorKey: 'content',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <TypeIcon className="size-4" />
          内容
        </span>
      )
    },
  },
  {
    accessorKey: 'reference',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Quote className="size-4" />
          来源
        </span>
      )
    },
    cell: ({ row }) => {
      const reference = row.original.reference.toString()
      return <span>{reference}</span>
    },
  },
  {
    accessorKey: 'isPublished',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Eye className="size-4" />
          是否发布
        </span>
      )
    },
    cell: ({ row }) => {
      return <PublishToggleSwitch echoId={row.original.id} />
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
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
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Wrench className="size-4" />
          操作
        </span>
      )
    },
    cell: ({ row }) => {
      const { id, content, isPublished, reference } = row.original

      return (
        <ActionButtons
          content={content}
          id={id}
          isPublished={isPublished}
          reference={reference}
        />
      )
    },
  },
]

function PublishToggleSwitch({ echoId }: { echoId: number }) {
  const { echos, setEchos } = useEchoStore()
  const [isPending, startTransition] = useTransition()

  if (echos.length === 0) return null

  const echo = echos.find(item => item.id === echoId)
  if (!echo) return null

  const handleToggle = async () => {
    const newStatus = !echo.isPublished

    const preEchos = [...echos]

    const updated = echos.map(item =>
      item.id === echoId ? { ...item, isPublished: newStatus } : item,
    )

    setEchos(updated)
    startTransition(async () => {
      try {
        await toggleEchoPublishedById(echoId, newStatus)
        toast.success(`${newStatus ? '发布成功' : '隐藏成功'}`)
      } catch (error) {
        setEchos(preEchos)
        if (error instanceof Error) {
          toast.error(`发布状态更新失败 ${error.message}`)
        } else {
          toast.error(`发布状态更新失败`)
        }
      }
    })
  }

  return (
    <Switch
      onCheckedChange={handleToggle}
      checked={echo.isPublished}
      disabled={isPending}
    />
  )
}

function ActionButtons({
  id,
  content,
  isPublished,
  reference,
}: {
  id: number
  content: string
  isPublished: boolean
  reference: string
}) {
  const { setModalOpen } = useModalStore()
  const { setEchos, echos } = useEchoStore()

  const handleEchoDelete = async () => {
    try {
      await deleteEchoById(id)

      const newTables = echos.filter(echo => echo.id !== id)
      setEchos(newTables)
      toast.success(`删除成功~`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`删除 echo 失败 ${error.message}`)
      } else {
        toast.error(`删除 echo 失败`)
      }
    }
  }

  return (
    <section className="flex items-center gap-1">
      <Button
        variant={'outline'}
        className="size-8"
        onClick={() => {
          setModalOpen('editEchoModal', {
            id,
            content,
            isPublished,
            reference,
          })
        }}
      >
        <Edit2 className="size-4" />
      </Button>
      <Button
        variant={'outline'}
        className="size-8 text-red-600"
        onClick={() => {
          setModalOpen('deleteEchoModal', handleEchoDelete)
        }}
      >
        <Trash />
      </Button>
    </section>
  )
}
