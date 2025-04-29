'use server'

import type {
  createArticleParams,
  UpdateArticleParamsWithNoteId,
} from '@/components/shared/admin-article-edit-page'
import { prisma } from '@/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createNote(values: createArticleParams) {
  await requireAdmin()

  const existingNote = await prisma.note.findUnique({
    where: { slug: values.slug },
  })

  if (existingNote) {
    throw new Error('该 slug 已存在')
  }

  // 获取关联的标签
  const relatedTags = await prisma.noteTag.findMany({
    where: {
      tagName: {
        in: values.relatedTagNames,
      },
    },
    select: { id: true },
  })

  revalidatePath('/note')

  return await prisma.note.create({
    data: {
      title: values.title,
      slug: values.slug,
      isPublished: values.isPublished,
      content: values.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: {
        connect: relatedTags.map(tag => ({ id: tag.id })),
      },
    },
  })
}

export async function deleteNoteById(noteId: number) {
  await requireAdmin()

  revalidatePath('/note')

  return prisma.note.delete({
    where: {
      id: noteId,
    },
  })
}

export async function toggleNotePublishedById(id: number, newIsPublishedStatus: boolean) {
  await requireAdmin()

  revalidatePath('/note')

  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      isPublished: newIsPublishedStatus,
    },
  })
}

// todo: 函数组合, 优化代码
export async function updateNoteById(values: UpdateArticleParamsWithNoteId) {
  await requireAdmin()

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

  // 获取新的关联标签
  const relatedTags = await prisma.noteTag.findMany({
    where: {
      tagName: {
        in: values.relatedTagNames,
      },
    },
    select: {
      id: true,
    },
  })

  // 获取当前 Note 的所有关联标签
  const currentTags = await prisma.note.findUnique({
    where: { id: values.id },
    select: {
      tags: {
        select: { id: true },
      },
    },
  })

  if (!currentTags) {
    throw new Error('Note 不存在')
  }

  const currentTagIds = currentTags.tags.map(tag => tag.id)
  const newTagIds = relatedTags.map(tag => tag.id)

  // 找出需要断开关系的标签
  const tagsToDisconnect = currentTagIds
    .filter(tagId => !newTagIds.includes(tagId))
    .map(tagId => ({ id: tagId }))

  // 找出需要连接的新标签
  const tagsToConnect = newTagIds
    .filter(tagId => !currentTagIds.includes(tagId))
    .map(tagId => ({ id: tagId }))

  // 更新 Note 的标签关联
  await prisma.note.update({
    where: { id: values.id },
    data: {
      tags: {
        disconnect: tagsToDisconnect, // 断开不再关联的标签
        connect: tagsToConnect, // 连接新的标签
      },
    },
  })

  revalidatePath('/note')

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

// * 获取所有的 note，模糊查询
export async function getQueryNotes(noteTitle: string) {
  return await prisma.note.findMany({
    where: {
      title: {
        contains: noteTitle,
      },
    },
    include: {
      tags: true, // tags 是一个 NoteTag 数组
    },
  })
}

// * 获取所有的 note
export async function getAllNotes() {
  return await prisma.note.findMany({
    include: {
      tags: true, // 包含与 Note 关联的 NoteTag
    },
  })
}

// * 获取所有关联 note 的 tag
export async function getTagsOnNote() {
  return await prisma.noteTag.findMany({
    select: {
      tagName: true,
    },
  })
}

// * 根据选中的标签获取 note
export async function getNotesBySelectedTagName(tagNamesArray: string[]) {
  const notes = await prisma.note.findMany({
    where: {
      AND: [
        {
          tags: {
            some: {
              tagName: {
                in: tagNamesArray,
              },
            },
          },
        },
      ],
    },
    include: {
      tags: true,
    },
  })

  return notes.filter((note) => {
    const noteTagNames = note.tags.map(tagOnNote => tagOnNote.tagName)
    return tagNamesArray.every(tag => noteTagNames.includes(tag)) // 选中的标签必须都在笔记的标签中
  })
}

export async function getAllShowNotes() {
  return await prisma.note.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getNoteBySlug(slug: string) {
  return await prisma.note.findUnique({
    where: {
      slug,
    },
    include: {
      tags: true,
    },
  })
}
