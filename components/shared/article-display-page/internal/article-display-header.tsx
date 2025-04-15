import TagItemBadge from '@/components/shared/tag-item-badge'
import { toZhDay } from '@/lib/time'

export default function ArticleDisplayHeader({
  title,
  createdAt,
  tags,
}: {
  title: string
  createdAt: Date
  tags: string[]
}) {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <section className="flex flex-col gap-2 justify-center w-full">
        <p className="flex gap-2 justify-center w-full">
          {tags.map((tag, i) => (
            <TagItemBadge
              key={`${i}+${tag.toString()}+${tag[i]?.toString()}`}
              tag={tag}
            />
          ))}
        </p>
        <time>{toZhDay(createdAt)}</time>
      </section>
    </header>
  )
}
