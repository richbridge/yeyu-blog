'use client'

import {
  getAllTags,
  updateBlogTagById,
  updateNoteTagById,
} from '@/actions/tags'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TAG_NAME_MAX_LENGTH } from '@/config/constant'
import { useModalStore } from '@/store/use-modal-store'
import { useTagStore } from '@/store/use-tag-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { TagType } from '@prisma/client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  tagName: z
    .string()
    .min(1, { message: '标签名不能为空' })
    .max(TAG_NAME_MAX_LENGTH, { message: '标签名超出大小限制' }),
})

export type WithTagIdValues = z.infer<typeof formSchema> & {
  tagId: number
}

// * 应该放一个表单
export default function EditTagModal() {
  const { modalType, onModalClose, payload } = useModalStore()
  const isModalOpen = modalType === 'editTagModal'
  const { setTags } = useTagStore()
  const { tagId, tagName, tagType } = payload
    ? (payload as {
        tagId: number
        tagName: string
        tagType: TagType
      })
    : {}

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: tagName ?? '',
    },
  })

  useEffect(() => {
    if (isModalOpen && tagName) {
      form.reset({ tagName })
    }
  }, [tagName, isModalOpen, form])

  const handleTagNameChange = async (values: WithTagIdValues) => {
    try {
      if (tagType === TagType.BLOG) {
        await updateBlogTagById(values)
      }
      else if (tagType === TagType.NOTE) {
        await updateNoteTagById(values)
      }
      else {
        throw new Error('标签类型错误!')
      }
      toast.success(`修改成功`)
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(`修改标签出错 ${error.message}`)
      }
      else {
        toast.error(`修改标签出错`)
      }
    }

    const allTags = await getAllTags()
    setTags(allTags)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!tagId || !tagName) {
      toast.error(`tagId 和 tagName 不能为空`)
      return
    }
    await handleTagNameChange({ ...values, tagId })
    onModalClose()
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑标签</DialogTitle>
          <DialogDescription>
            修改标签名会影响所有关联的文章喵~
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="tagName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标签名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入新的标签名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">保存修改</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
