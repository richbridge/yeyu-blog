import { deleteBlogTagById, deleteNoteTagById } from '@/actions/tags'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/store/use-modal-store'

export default function DeleteTagModal() {
  const { modalType, payload, onModalClose } = useModalStore()
  const isModalOpen = modalType === 'deleteTagModal'

  const { tagId, tagType } = payload
    ? (payload as {
        tagId: number
        tagType: 'Blog' | 'Note'
      })
    : {}

  const handleTagDelete = async () => {
    if (tagType === 'Blog' && tagId) {
      await deleteBlogTagById(tagId)
    } else if (tagType === 'Note' && tagId) {
      await deleteNoteTagById(tagId)
    } else {
      throw new Error('标签类型错误或 tagId 不存在!')
    }
    onModalClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="flex flex-col items-center gap-4">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>确定要删除该标签吗🥹</DialogTitle>
          <DialogDescription>
            不会删除关联的所有文章哦, 只是断开标签和文章的连接
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <Button
            variant={'destructive'}
            type="submit"
            onClick={() => handleTagDelete()}
          >
            确定
          </Button>
          <Button variant={'outline'} onClick={onModalClose}>
            取消
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
