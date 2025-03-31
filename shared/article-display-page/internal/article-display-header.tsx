import { Badge } from '@/components/ui/badge'

export default function ArticleDisplayHeader({
  blogTitle,
  createdAt,
  tags,
}: {
  blogTitle: string
  createdAt: string
  tags: string[]
}) {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">{blogTitle}</h1>
      <section className="flex flex-col gap-2 justify-center w-full">
        <div className="flex gap-2 justify-center w-full">
          {tags.map((tag, i) => (
            <Badge
              key={i}
              className="flex items-center font-mono font-light"
              variant={'secondary'}
            >{`#${tag}`}</Badge>
          ))}
        </div>
        <small>{createdAt}</small>
      </section>
    </header>
  )
}
