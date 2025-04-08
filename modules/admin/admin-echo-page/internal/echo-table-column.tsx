'use client'

import { Switch } from '@/components/ui/switch'
import { prettyDateTime } from '@/lib/time'
import { Echo } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Edit2, Trash } from 'lucide-react'
import { useEchoStore } from '@/store/use-echo-store'
import { deleteEchoById, toggleEchoPublishedById } from '@/actions/echos'
import { useModalStore } from '@/store/use-modal-store'

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
      const echoId = row.original.id
      // const echo = row.original
      const { echos, setEchos } = useEchoStore()

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

        try {
          await toggleEchoPublishedById(echoId, newStatus)
        } catch (error) {
          setEchos(preEchos)
          console.error('发布状态更新失败', error)
        }
      }

      return (
        <Switch onCheckedChange={handleToggle} checked={echo.isPublished} />
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
      const { id, content, isPublished, reference } = row.original

      const { setModalOpen } = useModalStore()
      const { setEchos } = useEchoStore()

      const handleEchoDelete = async () => {
        try {
          await deleteEchoById(id)

          const newTables = table.options.data.filter(echo => echo.id !== id)
          // const newTables = await getAllBlogs()
          setEchos(newTables)
        } catch (error) {
          console.error(`删除 ${row.original.content} 出错~`, error)
        }
      }

      return (
        <section className="flex items-center gap-1">
          {/* 查看直接使用那种变形对话框!!! */}
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
            className="size-8"
            onClick={() => {
              setModalOpen('deleteEchoModal', handleEchoDelete)
            }}
          >
            <Trash />
          </Button>
        </section>
      )
    },
  },
]
