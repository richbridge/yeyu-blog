import { useModalOpen } from '@/components/context/modal-open-context'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function CreateBlogModal() {
  const { openModal, setOpenModal } = useModalOpen()
  const isOpenModal = openModal === 'createBlogModal'

  return (
    <Dialog open={isOpenModal} onOpenChange={() => setOpenModal(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建博客表单</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
