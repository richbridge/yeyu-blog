import { ExternalLinks } from '@/config/external-links'
import Link from 'next/link'

export default function ContactMe() {
  return (
    <main className="flex items-center justify-center flex-col gap-2 md:gap-4 w-full mt-6">
      <hr className="w-1/2 dark:border-accent border-indigo-500" />
      <h3>
        联系方式 -{' '}
        <small>
          如果你 <span className="line-through text-pink-400">喜欢</span>{' '}
          我的话~
        </small>
      </h3>
      <p className="flex gap-4 underline">
        {ExternalLinks.map(link => (
          <Link
            className="hover:text-purple-600 dark:hover:text-emerald-300"
            href={link.url}
            key={link.url}
            target="_blank"
          >
            {link.name}
          </Link>
        ))}
      </p>
    </main>
  )
}
