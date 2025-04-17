'use client'

import { useEffect, useState } from 'react'
import { getRandomEcho } from '@/actions/echos'
import { Echo } from '@prisma/client'

export default function EchoCard() {
  const [randomEcho, setRandomEcho] = useState<Echo | null>(null)

  useEffect(() => {
    getRandomEcho().then(setRandomEcho)
  }, [])

  return (
    <section
      className="flex flex-col w-2/3 md:w-1/2 p-2 rounded-sm
                  hover:scale-105 duration-300
                bg-slate-300 dark:bg-gray-950"
    >
      <p className="underline">
        {randomEcho?.content ?? '我在等网络加载，你在等什么？'}
      </p>
      <footer className="ml-auto text-sm font-thin text-pink-500">
        「{randomEcho?.reference ?? '叶鱼'}」
      </footer>
    </section>
  )
}
