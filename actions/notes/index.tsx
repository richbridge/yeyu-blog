'use server'

import { updateArticleParamsWithNoteId } from '@/components/shared/admin-article-edit-page'
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

export const toggleArticlePublished = async (
  id: number,
  newIsPublishedStatus: boolean,
) => {
  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      isPublished: newIsPublishedStatus,
    },
  })
}

export const deleteNoteById = async (noteId: number) => {
  return prisma.note.delete({
    where: {
      id: noteId,
    },
  })
}

export const updateNoteById = async (values: updateArticleParamsWithNoteId) => {
  const existingNote = await prisma.note.findUnique({
    where: {
      slug: values.slug,
      NOT: {
        id: values.id,
      },
    },
  })

  if (existingNote) {
    throw new Error('该 slug 已存在')
  }

  const relatedTags = await prisma.tag.findMany({
    where: {
      tagName: {
        in: values.relatedBlogTagNames,
      },
    },
    select: {
      id: true,
    },
  })

  await prisma.tagOnNote.deleteMany({
    where: { noteId: values.id },
  })

  //️ 重新添加新的 Tag 关联
  if (relatedTags.length > 0 && relatedTags.length <= 5) {
    await prisma.tagOnNote.createMany({
      data: relatedTags.map(tag => ({
        noteId: values.id,
        tagId: tag.id,
      })),
    })
  }

  return await prisma.note.update({
    where: {
      id: values.id,
    },
    data: {
      title: values.title,
      slug: values.slug,
      isPublished: values.isPublished,
      updatedAt: new Date(),
      content: values.content,
    },
  })
}
