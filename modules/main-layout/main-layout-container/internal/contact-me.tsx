import { ExternalLinks } from '@/config/external-links'
import Link from 'next/link'

export default function ContactMe() {
  return (
    <main className="mb-6 font-wenkai text-lg text-white flex items-center justify-center flex-col gap-4 w-full">
      <hr className="w-1/2" />
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
            className="hover:text-emerald-300"
            href={link.url}
            key={link.url}
          >
            {link.name}
          </Link>
        ))}
      </p>
    </main>
  )
}
