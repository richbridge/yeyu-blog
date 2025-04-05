'use client'

import DeleteArticleModal from '@/components/modal/delete-article-modal'
import EditTagModal from '@/components/modal/edit-tag-modal'
import DeleteTagModal from '@/components/modal/delete-tag-modal'

export function ModalProvider() {
  return (
    <>
      <DeleteArticleModal />
      <EditTagModal />
      <DeleteTagModal />
    </>
  )
}
