'use client'

import { toZhDay } from '@/lib/time'
import Link from 'next/link'

export default function NoteListItem({
  noteTitle,
  createdAt,
  slug,
}: {
  noteTitle: string
  createdAt: Date
  slug: string
}) {
  return (
    <Link
      href={`note/${slug}`}
      className="flex items-center justify-between gap-10 p-2 cursor-pointer 
                hover:text-purple-600 hover:bg-slate-300
                dark:hover:text-emerald-300 dark:hover:bg-gray-800 rounded-sm duration-500 group"
    >
      <h2 className="underline truncate">{noteTitle}</h2>
      <time className="shrink-0 text-sm font-light text-gray-400 group-hover:text-pink-500">
        {toZhDay(createdAt)}
      </time>
    </Link>
  )
}
