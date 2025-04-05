'use server'

import { WithTagIdValues } from '@/components/modal/edit-tag-modal'
import { prisma } from '@/db'

export const getBlogTagsAndNoteTags = async () => {
  const [blogTags, noteTags] = await Promise.all([
    prisma.blogTag.findMany({
      include: {
        _count: true,
      },
    }),
    prisma.noteTag.findMany({
      include: {
        _count: true,
      },
    }),
  ])
  // * 标准化输出结构，加上统一的 `count` 字段, 前端就不用处理了, 希望以后也有这么好的后端🥹
  const blogTagsWithCount = blogTags.map(tag => ({
    id: tag.id,
    tagName: tag.tagName,
    tagType: tag.tagType,
    count: tag._count.blogs,
  }))

  const noteTagsWithCount = noteTags.map(tag => ({
    id: tag.id,
    tagName: tag.tagName,
    tagType: tag.tagType,
    count: tag._count.notes,
  }))

  return [...blogTagsWithCount, ...noteTagsWithCount]
}

export const updateBlogTagById = async (values: WithTagIdValues) => {
  const { tagId, tagName } = values

  const existingTag = await prisma.blogTag.findFirst({
    where: {
      tagName,
      NOT: {
        id: tagId,
      },
    },
  })

  if (existingTag) {
    throw new Error(`标签名 "${tagName}" 已存在`)
  }

  return await prisma.blogTag.update({
    where: {
      id: tagId,
    },
    data: {
      tagName,
    },
  })
}

export const updateNoteTagById = async (values: WithTagIdValues) => {
  const { tagId, tagName } = values

  const existingTag = await prisma.noteTag.findFirst({
    where: {
      tagName,
      NOT: {
        id: tagId,
      },
    },
  })

  if (existingTag) {
    throw new Error(`标签名 "${tagName}" 已存在`)
  }

  return await prisma.noteTag.update({
    where: {
      id: tagId,
    },
    data: {
      tagName,
    },
  })
}
