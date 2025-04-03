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

export const getALlNotes = async () => {
  return await prisma.note.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}

export const getTagsOnNote = async () => {
  return await prisma.tag.findMany({
    select: {
      tagName: true,
    },
  })
}

export const getNotesBySelectedTagName = async (tagNameArray: string[]) => {
  const tagIds = await prisma.tag.findMany({
    where: {
      tagName: {
        in: tagNameArray,
      },
    },
    select: {
      id: true,
    },
  })

  const notes = await prisma.note.findMany({
    where: {
      AND: [
        {
          tags: {
            some: {
              tagId: {
                in: tagIds.map(tag => tag.id),
              },
            },
          },
        },
      ],
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  return notes.filter(note => {
    const noteTagNames = note.tags.map(tagOnNote => tagOnNote.tag.tagName)
    return tagNameArray.every(tag => noteTagNames.includes(tag))
  })
}
