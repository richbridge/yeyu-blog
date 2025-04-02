'use server'

import { prisma } from '@/db'

// * 获取所有的 blog, 模糊查询
export const getQueryBlogs = async (blogTitle: string) => {
  return await prisma.blog.findMany({
    where: {
      title: {
        contains: blogTitle,
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

// * 先不考虑分页的事
export const getAllBlogs = async () => {
  return await prisma.blog.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}

// * 获取所有关联 blog 的 tag
export const getTagsOnBlog = async () => {
  return await prisma.tag.findMany({
    select: {
      tagName: true,
    },
  })
}

export const toggleArticlePublished = async (
  id: number,
  newIsPublishedStatus: boolean,
) => {
  return await prisma.blog.update({
    where: {
      id,
    },
    data: {
      isPublished: newIsPublishedStatus,
    },
  })
}

export const getBlogsBySelectedTagName = async (tagNamesArray: string[]) => {
  const tagIds = await prisma.tag.findMany({
    where: {
      tagName: { in: tagNamesArray },
    },
    select: { id: true },
  })

  const blogs = await prisma.blog.findMany({
    where: {
      AND: [
        {
          tags: {
            some: {
              tagId: { in: tagIds.map(tag => tag.id) },
            },
          },
        },
      ],
    },
    include: {
      tags: {
        include: { tag: true },
      },
    },
  })

  return blogs.filter(blog => {
    const blogTagNames = blog.tags.map(tagOnBlog => tagOnBlog.tag.tagName)
    return tagNamesArray.every(tag => blogTagNames.includes(tag)) // 选中的标签必须都在博客的标签中
  })
}

export const deleteBlogById = async (blogId: number) => {
  return prisma.blog.delete({
    where: {
      id: blogId,
    },
  })
}
