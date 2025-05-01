'use server'

import type { EchoValues } from '@/components/modal/create-echo-modal'
import type { OmitCreatedAtEcho } from '@/components/modal/edit-echo-modal'
import { prisma } from '@/db'
import { requireAdmin } from '@/lib/auth'

export async function createEcho(values: EchoValues) {
  await requireAdmin()

  return await prisma.echo.create({
    data: {
      content: values.echoContent,
      reference: values.echoReference,
      isPublished: values.isPublished,
    },
  })
}

export async function deleteEchoById(id: number) {
  await requireAdmin()

  return await prisma.echo.delete({
    where: {
      id,
    },
  })
}

export async function updateEchoById(values: OmitCreatedAtEcho) {
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

export async function toggleEchoPublishedById(id: number, newIsPublishedStatus: boolean) {
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

export async function getQueryEchos(queryContent: string) {
  return await prisma.echo.findMany({
    where: {
      content: {
        contains: queryContent,
      },
    },
  })
}

export async function getAllEchos() {
  return await prisma.echo.findMany()
}

export async function getRandomPublishedEcho() {
  const count = await prisma.echo.count({
    where: {
      isPublished: true,
    },
  })
  const skip = Math.floor(Math.random() * count)

  return await prisma.echo.findFirst({
    skip,
  })
}
