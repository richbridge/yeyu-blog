import { toggleBlogPublishedById } from '@/actions/blogs'
import { Switch } from '@/components/ui/switch'
import { useBlogStore } from '@/store/use-blog-store'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function PublishToggleSwitch({
  blogId,
  isPublished,
}: {
  blogId: number
  isPublished: boolean
}) {
  const { setBlogs, blogs } = useBlogStore()
  const [isPending, startTransition] = useTransition()

  const handleToggle = async () => {
    const newStatus = !isPublished
    const preBlogs = [...blogs]

    const updated = blogs.map(item =>
      item.id === blogId ? { ...item, isPublished: newStatus } : item,
    )
    setBlogs(updated)

    startTransition(async () => {
      try {
        await toggleBlogPublishedById(blogId, newStatus)
        toast.success(`更新成功`)
      }
      catch (error) {
        setBlogs(preBlogs)
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
