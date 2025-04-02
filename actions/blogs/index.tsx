'use server'

import { prisma } from '@/db'

// * 获取所有的 blog, 模糊查询
export const getBlogs = async (blogTitle: string) => {
  return await prisma.blog.findMany({
    where: {
      title: {
        contains: blogTitle,
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
