'use client'

import type { Theme } from '@giscus/react'
import { useTransitionTheme } from '@/hooks/use-transition-theme'
import Giscus from '@giscus/react'

// * term 唯一且不可变，用 id 做，防止评论丢失
export default function CommentCard({ term }: { term: string }) {
  const { theme } = useTransitionTheme()

  const commentTheme: Theme = theme === 'light' ? 'light_protanopia' : 'catppuccin_macchiato'

  return (
    <Giscus
      id="comments"
      repo="NeilYeTAT/yeyu-blog-comment"
      repoId="R_kgDOOiAAJA"
      category="Announcements"
      categoryId="DIC_kwDOOiAAJM4Cpm1t"
      mapping="specific"
      term={term}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={commentTheme}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
