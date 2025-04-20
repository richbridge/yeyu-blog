'use client'

import { useEffect, useState } from 'react'
import { getRandomPublishedEcho } from '@/actions/echos'
import { Echo } from '@prisma/client'

let cachedEcho: Echo | null = null

export default function EchoCard() {
  const [echo, setEcho] = useState<Echo | null>(cachedEcho)

  useEffect(() => {
    if (!cachedEcho) {
      getRandomPublishedEcho().then(res => {
        if (res) {
          cachedEcho = res
          setEcho(res)
        }
      })
    }
  }, [])

  return (
    <section
      className="flex flex-col w-2/3 p-2 rounded-sm
                bg-slate-300 dark:bg-gray-950"
    >
      <p className="underline">
        {echo?.content ?? '我在等网络加载，你在等什么？'}
      </p>
      <footer className="ml-auto text-sm font-thin text-pink-600 dark:text-emerald-300">
        「{echo?.reference ?? '叶鱼'}」
      </footer>
    </section>
  )
}
