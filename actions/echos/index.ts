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

// * 模糊查询
export const getQueryEchos = async (queryContent: string) => {
  return await prisma.echo.findMany({
    where: {
      content: {
        contains: queryContent,
      },
    },
  })
}

export const getAllEchos = async () => {
  return await prisma.echo.findMany()
}
