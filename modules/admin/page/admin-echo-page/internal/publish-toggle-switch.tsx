import { toggleEchoPublishedById } from '@/actions/echos'
import { Switch } from '@/components/ui/switch'
import { useEchoStore } from '@/store/use-echo-store'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function PublishToggleSwitch({ echoId }: { echoId: number }) {
  const { echos, setEchos } = useEchoStore()
  const [isPending, startTransition] = useTransition()

  if (echos.length === 0)
    return null

  const echo = echos.find(item => item.id === echoId)
  if (!echo)
    return null

  const handleToggle = async () => {
    const newStatus = !echo.isPublished

    const preEchos = [...echos]

    const updated = echos.map(item =>
      item.id === echoId ? { ...item, isPublished: newStatus } : item,
    )

    setEchos(updated)
    startTransition(async () => {
      try {
        await toggleEchoPublishedById(echoId, newStatus)
        toast.success(`${newStatus ? '发布成功' : '隐藏成功'}`)
      }
      catch (error) {
        setEchos(preEchos)
        if (error instanceof Error) {
          toast.error(`发布状态更新失败 ${error.message}`)
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
      checked={echo.isPublished}
      disabled={isPending}
    />
  )
}
