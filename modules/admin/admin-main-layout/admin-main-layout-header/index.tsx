'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import AdminLogo from './internal/admin-logo'
import AvatarDropdownMenu from './internal/avatar-dropdown-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
// import AdminClock from './internal/admin-clock'

export const AdminRoutes = [
  {
    path: '/admin',
    pathName: '首页',
  },
  {
    path: '/admin/blog',
    pathName: '博客',
  },
  {
    path: '/admin/note',
    pathName: '笔记',
  },
  {
    path: '/admin/tag',
    pathName: '标签',
  },
] as const

const AdminNavbar = () => {
  const pathname = usePathname()

  return (
    <header
      className="h-14 fixed w-full top-0 border-b backdrop-blur-lg z-50
                  flex justify-between items-center px-2"
    >
      <nav className="flex gap-4">
        {/* 左侧logo区域, 回到首页 */}
        <AdminLogo />
        {/* 路由 */}
        {AdminRoutes.map(link => (
          <Link href={link.path} key={link.path}>
            <Button
              className="rounded-lg text-base cursor-pointer"
              variant={pathname === link.path ? 'secondary' : 'ghost'}
              size={'sm'}
            >
              {link.pathName}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="px-4 flex gap-4 items-center">
        <ModeToggle />
        <AvatarDropdownMenu />
      </div>
    </header>
  )
}

export default AdminNavbar
