'use client'

import { REGEX } from '@/lib/regex'
import { Blog, BlogTag, Note, NoteTag } from '@prisma/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Combobox } from '@/components/ui/combobox'
import { File } from 'lucide-react'
import { updateBlogById } from '@/actions/blogs'
import { redirect, usePathname } from 'next/navigation'
import MarkdownEditor from './internal/markdown-editor'
import { updateNoteById } from '@/actions/notes'

const formSchema = z.object({
  title: z.string().min(1, { message: '长度不能少于1个字符' }).max(250),
  slug: z
    .string()
    .regex(REGEX.SLUG, {
      message: '只允许输入数字、小写字母和中横线',
    })
    .min(1, { message: '长度不能少于1个字符' }),
  isPublished: z.boolean().optional(),
  relatedBlogTagNames: z
    .string()
    .array()
    .min(1, { message: '最少选择 1 个标签' })
    .max(5, { message: '最多只能选择 5 个标签' }),
  content: z.string(),
})

export type updateArticleParamsWithBlogId = z.infer<typeof formSchema> & {
  id: number
}

export type updateArticleParamsWithNoteId = z.infer<typeof formSchema> & {
  id: number
}

const getEditPageType = (url: string): 'BLOG' | 'NOTE' => {
  const type = url.split('/')[2].toUpperCase()
  if (type === 'BLOG' || type === 'NOTE') {
    return type
  }
  throw new Error(`Unexpected page type: ${type}`)
}

// * 表单渲染, markdown 编辑器集成
export default function AdminBlogEditPage({
  articles,
  relatedArticleTagNames,
  allTags,
}: {
  articles: Blog | Note
  relatedArticleTagNames: string[]
  allTags: BlogTag[] | NoteTag[]
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: articles.title ?? '',
      slug: articles.slug ?? '',
      isPublished: articles.isPublished ?? false,
      // * 后序更新用
      relatedBlogTagNames: relatedArticleTagNames ?? [],
      content: articles.content ?? '',
    },
  })
  const url = usePathname()
  const editPageType = getEditPageType(url)

  // * 保存按扭, 更新文章
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (editPageType === 'BLOG') {
      await updateBlogById({ ...values, id: articles.id })
    } else {
      await updateNoteById({ ...values, id: articles.id })
    }
    redirect(`${values.slug}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full pb-44"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">标题</FormLabel>
              <FormControl>
                <Input placeholder="请输入标题" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">slug</FormLabel>
              <FormControl>
                <Input placeholder="请输入 slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">是否发布</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={checked => {
                    console.log('发布状态 => ', checked)
                    field.onChange(checked)
                  }}
                ></Switch>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relatedBlogTagNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">标签</FormLabel>
              <FormControl>
                <Combobox
                  options={
                    allTags.map(el => ({
                      label: el.tagName,
                      value: el.tagName,
                    })) ?? []
                  }
                  multiple
                  clearable
                  selectPlaceholder="请选择标签"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">内容</FormLabel>
              <FormControl>
                <MarkdownEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          <File />
          保存
        </Button>
      </form>
    </Form>
  )
}
