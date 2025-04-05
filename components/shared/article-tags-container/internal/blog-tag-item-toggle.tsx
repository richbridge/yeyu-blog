'use client'

import { getAllBlogs, getBlogsBySelectedTagName } from '@/actions/blogs'
import { Toggle } from '@/components/ui/toggle'
import { useBlogStore } from '@/hooks/use-blog-store'
import { useSelectedTagStore } from '@/hooks/use-selected-tag-store'

// ! 后序需要重写样式, 现在稍微有些看不出来
export function BlogTagItemToggle({
  tag,
}: {
  tag: string
  onPressedChange?: (pressed: boolean) => void
}) {
  const { selectedTags, setSelectedTags } = useSelectedTagStore()
  const { setBlogs } = useBlogStore()

  const handleSelectedTagChange = async (selected: boolean) => {
    const updatedTags = selected
      ? [...selectedTags, tag]
      : selectedTags.filter(selectedTag => selectedTag !== tag)

    setSelectedTags(updatedTags)

    try {
      const blogs =
        updatedTags.length === 0
          ? await getAllBlogs()
          : await getBlogsBySelectedTagName(updatedTags)
      setBlogs(blogs)
    } catch (error) {
      console.error(`获取标签 ${updatedTags} 对应的文章失败~`, error)
    }
  }

  return (
    <Toggle
      variant={'outline'}
      size={'sm'}
      className="cursor-pointer"
      onPressedChange={handleSelectedTagChange}
    >
      {tag}
    </Toggle>
  )
}
