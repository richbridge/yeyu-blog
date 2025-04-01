import TagItem from './internal/tag-item'

export default function ArticleTagsContainer() {
  return (
    <section className="w-full flex gap-2 bg-slate-700">
      {Array(10)
        .fill(2000)
        .map((v, i) => (
          <TagItem key={i}>{v}</TagItem>
        ))}
    </section>
  )
}
