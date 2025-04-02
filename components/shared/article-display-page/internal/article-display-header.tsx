import TagItemBadge from '@/components/shared/tag-item-badge'

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
            <TagItemBadge
              key={`${i}+${tag.toString()}+${tag[i]?.toString()}`}
              tag={tag}
            />
          ))}
        </div>
        <small>{createdAt}</small>
      </section>
    </header>
  )
}
