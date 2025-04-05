import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCw, Search } from 'lucide-react'

export default function TagSearch() {
  return (
    <div className="flex gap-2">
      <Input className=""></Input>
      <Button className="">新建标签</Button>
      <Button type="button" variant={'secondary'}>
        <Search /> 搜索
      </Button>

      <Button variant={'secondary'}>
        <RotateCw /> 重置
      </Button>
    </div>
  )
}
