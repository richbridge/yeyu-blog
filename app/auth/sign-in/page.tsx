'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import StarsBackground from '@/components/shared/stars-background'
import { GithubIcon, RotateCcw } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="flex flex-col m-auto">
      <Card className="relative w-[320px] rounded-3xl py-4 sm:w-full sm:min-w-[360px] sm:max-w-none">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>
            <h3>你要登录喵?</h3>
          </CardTitle>
          <CardDescription>暂时仅支持GitHub登录喵 OvO</CardDescription>
        </CardHeader>
        <CardFooter>
          <main className="flex flex-col w-full gap-4">
            <Button
              type="button"
              onClick={() => signIn('github', { redirectTo: '/admin' })}
            >
              <GithubIcon /> GitHub登录
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-purple-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  或者
                </span>
              </div>
            </div>
            <Link href={'/'}>
              <Button type="button" className="w-full">
                <RotateCcw /> 回到过去喵~
              </Button>
            </Link>
          </main>
        </CardFooter>
      </Card>
      <StarsBackground />
    </div>
  )
}

export default LoginPage
