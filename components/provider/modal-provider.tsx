'use client'

import DeleteArticleModal from '@/components/modal/delete-article-modal'
import EditTagModal from '@/components/modal/edit-tag-modal'

export function ModalProvider() {
  return (
    <>
      <DeleteArticleModal />
      <EditTagModal />
    </>
  )
}
