'use client'

import { getALlNotes, getNotesBySelectedTagName } from '@/actions/notes'
import { useNotes } from '@/components/context/note-context'
import { useSelectedTags } from '@/components/context/selected-tag'
import { Toggle } from '@/components/ui/toggle'

// ! 后序需要重写样式, 现在稍微有些看不出来
export function NoteTagItemToggle({
  tag,
}: {
  tag: string
  onPressedChange?: (pressed: boolean) => void
}) {
  const { selectedTags, setSelectedTags } = useSelectedTags()
  const { setNotes } = useNotes()

  const handleSelectedTagChange = async (selected: boolean) => {
    const updatedTags = selected
      ? [...selectedTags, tag]
      : selectedTags.filter(selectedTag => selectedTag !== tag)

    setSelectedTags(updatedTags)

    try {
      const blogs =
        updatedTags.length === 0
          ? await getALlNotes()
          : await getNotesBySelectedTagName(updatedTags)
      setNotes(blogs)
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
