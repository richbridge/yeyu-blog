import { Badge } from '@/components/ui/badge'

export default function TagItemBadge({ tag }: { tag: string }) {
  return (
    <Badge
      className="flex items-center font-mono font-light"
      variant={'secondary'}
    >{`#${tag}`}</Badge>
  )
}
