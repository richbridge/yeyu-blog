'use server'

import { EchoValues } from '@/components/modal/create-echo-modal'
import { OmitCreatedAtEcho } from '@/components/modal/edit-echo-modal'
import { prisma } from '@/db'
import { requireAdmin } from '@/lib/auth'

export const createEcho = async (values: EchoValues) => {
  await requireAdmin()

  return await prisma.echo.create({
    data: {
      content: values.echoContent,
      reference: values.echoReference,
      isPublished: values.isPublished,
    },
  })
}

export const deleteEchoById = async (id: number) => {
  await requireAdmin()

  return await prisma.echo.delete({
    where: {
      id,
    },
  })
}

export const updateEchoById = async (values: OmitCreatedAtEcho) => {
  await requireAdmin()

  return await prisma.echo.update({
    where: {
      id: values.id,
    },
    data: {
      content: values.content,
      reference: values.reference,
      isPublished: values.isPublished,
      createdAt: new Date(),
    },
  })
}

export const toggleEchoPublishedById = async (
  id: number,
  newIsPublishedStatus: boolean,
) => {
  await requireAdmin()

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

export const getRandomEcho = async () => {
  const count = await prisma.echo.count()
  const skip = Math.floor(Math.random() * count)

  return await prisma.echo.findFirst({
    skip,
  })
}
