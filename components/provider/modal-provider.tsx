'use client'

import DeleteArticleModal from '@/components/modal/delete-article-modal'
import EditTagModal from '@/components/modal/edit-tag-modal'
import DeleteTagModal from '@/components/modal/delete-tag-modal'
import CreateEchoModal from '@/components/modal/create-echo-modal'
import DeleteEchoModal from '@/components/modal/delete-echo-modal'
import EditEchoModal from '@/components/modal/edit-echo-modal'
import CreateTagModal from '@/components/modal/create-tag-modal'

export function ModalProvider() {
  return (
    <>
      <DeleteArticleModal />
      <EditTagModal />
      <DeleteTagModal />
      <CreateEchoModal />
      <DeleteEchoModal />
      <EditEchoModal />
      <CreateTagModal />
    </>
  )
}
