'use server'

import { EchoValues } from '@/components/modal/create-echo-modal'
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

export const createEcho = async (values: EchoValues) => {
  return await prisma.echo.create({
    data: {
      content: values.echoContent,
      reference: values.echoReference,
      isPublished: values.isPublished,
    },
  })
}

export const deleteEchoById = async (id: number) => {
  return await prisma.echo.delete({
    where: {
      id,
    },
  })
}
