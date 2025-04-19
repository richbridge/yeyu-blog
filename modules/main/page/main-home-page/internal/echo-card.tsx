import { getRandomPublishedEcho } from '@/actions/echos'

export default async function EchoCard() {
  const randomEcho = await getRandomPublishedEcho()

  return (
    <section
      className="flex flex-col w-2/3 p-2 rounded-sm
                bg-slate-300 dark:bg-gray-950"
    >
      <p className="underline">
        {randomEcho?.content ?? '我在等网络加载，你在等什么？'}
      </p>
      <footer className="ml-auto text-sm font-thin text-pink-600 dark:text-emerald-300">
        「{randomEcho?.reference ?? '叶鱼'}」
      </footer>
    </section>
  )
}
