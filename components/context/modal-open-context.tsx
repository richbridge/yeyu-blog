'use client'

import { createContext, useContext, useState } from 'react'

const modals = ['createBlogModal'] as const

const ModalOpenContext = createContext<{
  openModal: (typeof modals)[number] | null
  setOpenModal: (openModalName: (typeof modals)[number] | null) => void
} | null>(null)

export function ModalOpenProvider({ children }: { children: React.ReactNode }) {
  const [openModal, setOpenModal] = useState<(typeof modals)[number] | null>(
    null,
  )

  return (
    <ModalOpenContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalOpenContext.Provider>
  )
}

export function useModalOpen() {
  const context = useContext(ModalOpenContext)
  if (!context) {
    throw new Error('useModalOpen 必须在 ModalOpenContext 内部使用')
  }
  return context
}
