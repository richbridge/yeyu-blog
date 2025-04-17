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
