import { deleteBlogTagById, deleteNoteTagById, getAllTags } from '@/actions/tags'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/store/use-modal-store'
import { useTagStore } from '@/store/use-tag-store'
import { TagType } from '@prisma/client'
import { Edit2, Trash } from 'lucide-react'
import { toast } from 'sonner'

export default function ActionButtons({
  tagId,
  tagName,
  tagType,
}: {
  tagId: number
  tagName: string
  tagType: TagType
}) {
  const { setModalOpen, onModalClose } = useModalStore()
  const { setTags } = useTagStore()

  const handleDelete = async () => {
    try {
      if (tagType === TagType.BLOG && tagId) {
        await deleteBlogTagById(tagId)
      }
      else if (tagType === TagType.NOTE && tagId) {
        await deleteNoteTagById(tagId)
      }
      else {
        throw new Error('标签类型错误或 tagId 不存在!')
      }
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(`删除标签 ${tagName} 失败~ ${error.message}`)
      }
      else {
        toast.error(`删除标签 ${tagName} 出错~`)
      }
    }
    const allTags = await getAllTags()
    setTags(allTags)
    onModalClose()
  }

  return (
    <section className="flex items-center gap-1">
      <Button
        variant="outline"
        className="size-8"
        onClick={() =>
          setModalOpen('editTagModal', {
            tagId,
            tagName,
            tagType,
          })}
      >
        <Edit2 className="size-4" />
      </Button>

      <Button
        variant="outline"
        className="size-8 text-red-600"
        onClick={() => {
          setModalOpen('deleteTagModal', handleDelete)
        }}
      >
        <Trash />
      </Button>
    </section>
  )
}
