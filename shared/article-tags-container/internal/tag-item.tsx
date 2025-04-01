import { Toggle } from '@/components/ui/toggle'

export default function TagItem({ children }: { children: string }) {
  return (
    <Toggle variant={'outline'} size={'sm'} className="cursor-pointer">
      {children}
    </Toggle>
  )
}
