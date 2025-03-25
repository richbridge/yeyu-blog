'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

export default function NoteListItem({
  noteTitle,
  createdAt,
  slug,
}: {
  noteTitle: string
  createdAt: string
  slug: string
}) {
  const [hoverIndex, setHoverIndex] = useState(false)
  return (
    <Link href={`note/${slug}`}>
      <motion.section
        className={
          'relative flex items-center justify-between gap-10 p-2 cursor-pointer duration-300 hover:text-emerald-300 group'
        }
        onHoverStart={() => setHoverIndex(true)}
        onHoverEnd={() => setHoverIndex(false)}
      >
        <h2 className="text-xl truncate">{noteTitle}</h2>
        <span className="shrink-0 font-mono text-sm font-light text-gray-400 group-hover:text-emerald-300 duration-300">
          {createdAt}
        </span>
        <AnimatePresence>
          {hoverIndex && (
            <motion.span
              className="absolute left-0 bg-purple-400/30 w-full h-full z-50 rounded-sm"
              layoutId="white-mask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
              }}
            />
          )}
        </AnimatePresence>
      </motion.section>
    </Link>
  )
}
