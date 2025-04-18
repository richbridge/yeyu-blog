'use client'

import ScaleUnderline from '@/components/shared/scale-underline'
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
                hover:text-purple-600
                dark:hover:text-emerald-300 rounded-sm duration-500 group"
    >
      <h2 className="relative truncate group">
        {noteTitle}
        <ScaleUnderline className="bg-emerald-300" />
      </h2>
      <time className="shrink-0 text-sm font-light text-gray-400 group-hover:text-emerald-300">
        {toZhDay(createdAt)}
      </time>
    </Link>
  )
}
