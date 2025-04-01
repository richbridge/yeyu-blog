import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, RotateCw, Search } from 'lucide-react'

export default function ArticleInput({
  createType,
}: {
  createType: '创建博客' | '创建笔记'
}) {
  return (
    <section className="flex w-full gap-4">
      <Input placeholder="请输入标题喵~" className="w-1/4" />

      <Button type="button" variant={'secondary'}>
        搜索 <Search />
      </Button>

      <Button variant={'secondary'}>
        重置 <RotateCw />
      </Button>

      <Button variant={'secondary'}>
        {createType} <Plus />
      </Button>
    </section>
  )
}
