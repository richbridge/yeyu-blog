import { toggleNotePublishedById } from '@/actions/notes'
import { Switch } from '@/components/ui/switch'
import { useNoteStore } from '@/store/use-note-store'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function PublishToggleSwitch({
  noteId,
  isPublished,
}: {
  noteId: number
  isPublished: boolean
}) {
  const { notes, setNotes } = useNoteStore()
  const [isPending, startTransition] = useTransition()

  const handleToggle = async () => {
    const newStatus = !isPublished
    const preNotes = [...notes]

    const updated = notes.map(item =>
      item.id === noteId ? { ...item, isPublished: newStatus } : item,
    )
    setNotes(updated)

    startTransition(async () => {
      try {
        await toggleNotePublishedById(noteId, newStatus)
        toast.success(`更新成功`)
      }
      catch (error) {
        setNotes(preNotes)
        if (error instanceof Error) {
          toast.error(`发布状态更新失败 ${error?.message}`)
        }
        else {
          toast.error(`发布状态更新失败`)
        }
      }
    })
  }

  return (
    <Switch
      onCheckedChange={handleToggle}
      checked={isPublished}
      disabled={isPending}
    />
  )
}
