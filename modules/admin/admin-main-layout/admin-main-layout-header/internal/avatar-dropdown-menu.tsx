'use client'

import { signOut, useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import YeYuAvatar from '@/components/shared/yeyu-avatar'

const AvatarDropdownMenu = () => {
  const { data: session } = useSession()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <YeYuAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg w-56">
          <DropdownMenuLabel className="p-1 flex gap-2 items-center">
            <YeYuAvatar />
            <section>
              <h3 className="font-mono">{session?.user?.name || 'example'} </h3>
              <small className="font-thin">
                {session?.user?.email || 'example@gmail.com'}
              </small>
            </section>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              signOut()
            }}
          >
            <LogOut />
            退出登录
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AvatarDropdownMenu
