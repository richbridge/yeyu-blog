'use client'

import { useEffect, useState } from 'react'
import { getTagsOnBlog } from '@/actions/blogs'
import { BlogTag } from '@prisma/client'
import { BlogTagItemToggle } from '@/components/shared/tag-item-toggle'
import { toast } from 'sonner'

export function BlogTagsContainer() {
  const [tags, setTags] = useState<BlogTag['tagName'][]>([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getTagsOnBlog()
        setTags(res.map(v => v.tagName))
      } catch (error) {
        toast.error(`获取 tags 数据错误 ${error}`)
        console.error(`获取 tags 数据错误`, error)
      }
    }

    fetchTags()
  }, [])

  return (
    <section className="w-full flex gap-2">
      {tags.map(tag => (
        <BlogTagItemToggle key={tag.toLowerCase()} tag={tag} />
      ))}
    </section>
  )
}
