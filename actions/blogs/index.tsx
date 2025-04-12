'use server'

import { prisma } from '@/db'
import type {
  createArticleParams,
  updateArticleParamsWithBlogId,
} from '@/components/shared/admin-article-edit-page'
import { requireAdmin } from '@/lib/auth'

export type WithTagsBlog = Awaited<ReturnType<typeof getAllBlogs>>[number]

export const createBlog = async (values: createArticleParams) => {
  await requireAdmin()

  const existingBlog = await prisma.blog.findUnique({
    where: { slug: values.slug },
  })

  if (existingBlog) {
    throw new Error('该 slug 已存在')
  }

  // 获取关联的标签
  const relatedTags = await prisma.blogTag.findMany({
    where: {
      tagName: {
        in: values.relatedTagNames,
      },
    },
    select: { id: true },
  })

  // 创建 Blog 并关联标签
  return await prisma.blog.create({
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

export const deleteBlogById = async (blogId: number) => {
  await requireAdmin()

  return prisma.blog.delete({
    where: {
      id: blogId,
    },
  })
}

export const toggleBlogPublishedById = async (
  id: number,
  newIsPublishedStatus: boolean,
) => {
  await requireAdmin()

  return await prisma.blog.update({
    where: {
      id,
    },
    data: {
      isPublished: newIsPublishedStatus,
    },
  })
}

// todo: 函数组合, 简化逻辑
export const updateBlogById = async (values: updateArticleParamsWithBlogId) => {
  await requireAdmin()

  const existingBlog = await prisma.blog.findUnique({
    where: {
      slug: values.slug,
      NOT: {
        id: values.id,
      },
    },
  })

  if (existingBlog) {
    throw new Error('该 slug 已存在')
  }

  // 获取新的关联标签
  const relatedTags = await prisma.blogTag.findMany({
    where: {
      tagName: {
        in: values.relatedTagNames,
      },
    },
    select: {
      id: true,
    },
  })

  // 获取当前 Blog 的所有关联标签
  const currentTags = await prisma.blog.findUnique({
    where: { id: values.id },
    select: {
      tags: {
        select: { id: true },
      },
    },
  })

  if (!currentTags) {
    throw new Error('Blog 不存在')
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

  // 更新 Blog 的标签关联
  await prisma.blog.update({
    where: { id: values.id },
    data: {
      tags: {
        disconnect: tagsToDisconnect, // 断开不再关联的标签
        connect: tagsToConnect, // 连接新的标签
      },
    },
  })

  return await prisma.blog.update({
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

// * 获取所有的 blog, 模糊查询
export const getQueryBlogs = async (blogTitle: string) => {
  return await prisma.blog.findMany({
    where: {
      title: {
        contains: blogTitle,
      },
    },
    include: {
      tags: true, // tags 是一个 BlogTag 数组
    },
  })
}

// * 先不考虑分页的事
export const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    include: {
      tags: true, // 包含与 Blog 关联的 BlogTag
    },
  })
}

// * 获取所有关联 blog 的 tag
export const getTagsOnBlog = async () => {
  return await prisma.blogTag.findMany({
    select: {
      tagName: true,
    },
  })
}

export const getBlogsBySelectedTagName = async (tagNamesArray: string[]) => {
  const blogs = await prisma.blog.findMany({
    where: {
      AND: [
        {
          tags: {
            some: {
              tagName: { in: tagNamesArray },
            },
          },
        },
      ],
    },
    include: {
      tags: true,
    },
  })

  return blogs.filter(blog => {
    const blogTagNames = blog.tags.map(tagOnBlog => tagOnBlog.tagName)
    return tagNamesArray.every(tag => blogTagNames.includes(tag)) // 选中的标签必须都在博客的标签中
  })
}
