import type { Metadata } from 'next'
import { LXGW_WenKai_Mono_TC } from 'next/font/google'

// *  -- prisma 长度限制 --
// * Blog
export const BLOG_TITLE_MAX_LENGTH = 50

// * Note
export const NOTE_TITLE_MAX_LENGTH = 50

// * Tags
export const TAG_NAME_MAX_LENGTH = 20

// * Echo
export const ECHO_REFERENCE_MAX_LENGTH = 20
export const ECHO_CONTENT_MAX_LENGTH = 100

// * Article, 一般 Blog 和 Note 其实是公用的这个
export const ARTICLE_TITLE_MAX_LENGTH = 50

// * -- 管理员邮箱数组 --
export const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',')

// * nextjs 中使用的 google 字体
export const LXGW = LXGW_WenKai_Mono_TC({
  weight: ['300', '700'],
  display: 'swap',
  variable: '--ye-font',
  preload: false,
})

// * 元数据，SEO，网页关键字。。。
export const metadata: Metadata = {
  title: `叶鱼 | 业余`,
  description: '记录前端开发、技术文章与生活思考的博客站点',
  keywords: [
    '前端开发',
    '技术博客',
    'React',
    'Next.js',
    'vue',
    'javascript',
    'typescript',
    '阅读',
    '叶鱼',
  ],
  authors: [{ name: '叶鱼', url: 'https://yeyu.fun' }],
  creator: '叶鱼',
}

// * 首页动画加载的文字，建议不要超过 5 个字，你也可以去修改样式~
export const INITIAL_WELCOME_TEXT = '业余'
