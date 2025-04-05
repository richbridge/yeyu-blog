'use server'

import { prisma } from '@/db'

export const toggleEchoPublished = async (
  id: number,
  newIsPublishedStatus: boolean,
) => {
  return await prisma.echo.update({
    where: {
      id,
    },
    data: {
      isPublished: newIsPublishedStatus,
    },
  })
}
