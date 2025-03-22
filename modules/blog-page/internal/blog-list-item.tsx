'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

export default function BlogListItem({
  blogTitle,
  createdAt,
  slug,
}: {
  blogTitle: string
  createdAt: string
  slug: string
}) {
  const [hoverIndex, setHoverIndex] = useState(false)
  return (
    <Link href={`blog/${slug}`}>
      <motion.section
        className={
          'relative flex items-center justify-between gap-10 p-2 cursor-pointer duration-300 hover:text-emerald-300 group'
        }
        onHoverStart={() => setHoverIndex(true)}
        onHoverEnd={() => setHoverIndex(false)}
      >
        <h2 className="text-xl truncate">{blogTitle}</h2>
        <span className="shrink-0 font-mono text-sm font-light text-gray-400 group-hover:text-emerald-300 duration-300">
          {createdAt}
        </span>
        {hoverIndex && (
          <motion.span
            className="absolute left-0 bg-purple-400/30 w-full h-full z-50 rounded-sm"
            layoutId="white-mask"
            transition={{
              type: 'spring',
            }}
          />
        )}
      </motion.section>
    </Link>
  )
}
