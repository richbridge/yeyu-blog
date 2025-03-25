'use client'

import { RouteList } from '@/config/route'
import { cn } from '@/lib/utils'
import MaxWidthWrapper from '@/shared/max-width-wrapper'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { motion } from 'motion/react'

export default function MainLayoutHeader() {
  const pathname = usePathname()
  return (
    <header className="h-14 flex items-center justify-center sticky top-0 border-b backdrop-blur-lg z-20 mb-6">
      <MaxWidthWrapper className="flex items-center justify-center">
        <nav className="flex gap-16">
          {RouteList.map(route => (
            <Fragment key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  'relative text-lg px-4',
                  pathname === route.path && 'text-emerald-300 font-bold',
                )}
              >
                <h2>{route.pathName}</h2>
                {route.path === pathname && (
                  <motion.span
                    className={cn(
                      'absolute h-[2px] w-full left-0 bottom-0 bg-emerald-400 rounded-full',
                      // pathname === '/' && 'bg-indigo-400',
                      // pathname === '/blog' && 'bg-pink-400',
                      // pathname === '/note' && 'bg-blue-500',
                      // pathname === '/about' && 'bg-purple-400',
                    )}
                    layoutId="route-list-bottom-line"
                  />
                )}
              </Link>
            </Fragment>
          ))}
        </nav>
      </MaxWidthWrapper>
    </header>
  )
}
