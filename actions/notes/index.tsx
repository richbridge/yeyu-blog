'use server'

import { prisma } from '@/db'

export const getQueryNotes = async (title: string) => {
  return await prisma.note.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}
