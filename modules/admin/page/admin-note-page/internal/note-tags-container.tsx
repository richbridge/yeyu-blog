'use client'

import { useEffect, useState } from 'react'
import { getTagsOnNote } from '@/actions/notes'
import { NoteTag } from '@prisma/client'
import { NoteTagItemToggle } from '@/components/shared/tag-item-toggle'
import { toast } from 'sonner'

export function NoteTagsContainer() {
  const [tags, setTags] = useState<NoteTag['tagName'][]>([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getTagsOnNote()
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
        <NoteTagItemToggle key={tag.toLowerCase()} tag={tag} />
      ))}
    </section>
  )
}
