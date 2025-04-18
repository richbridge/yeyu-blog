import { getRandomEcho } from '@/actions/echos'

// * 这里强制动态渲染也没有
// * 解决办法就是在 server action 中使用
// * import { unstable_noStore as noStore } from 'next/cache' 中的 noStore 函数
export default async function EchoCard() {
  const randomEcho = await getRandomEcho()

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
