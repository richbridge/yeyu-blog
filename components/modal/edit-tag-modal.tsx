'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '@/store/use-modal-store'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateBlogTagById, updateNoteTagById } from '@/actions/tags'
import { useEffect } from 'react'

const formSchema = z.object({
  tagName: z.string().min(2).max(50),
})

export type WithTagIdValues = z.infer<typeof formSchema> & {
  tagId: number
}

// * 应该放一个表单
export default function EditTagModal() {
  const { modalType, onModalClose, payload } = useModalStore()
  const isModalOpen = modalType === 'editTagModal'
  const { tagId, tagName, tagType } = payload
    ? (payload as {
        tagId: number
        tagName: string
        tagType: 'Blog' | 'Note'
      })
    : {}

  useEffect(() => {
    if (tagName) {
      form.reset({ tagName })
    }
  }, [tagName])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: tagName ?? '',
    },
  })

  const handleTagNameChange = async (values: WithTagIdValues) => {
    if (tagType === 'Blog') {
      await updateBlogTagById(values)
    } else if (tagType === 'Note') {
      await updateNoteTagById(values)
    } else {
      throw new Error('标签类型错误!')
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!tagId || !tagName) {
      return
    }
    handleTagNameChange({ ...values, tagId })
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
              <Button
                type="submit"
                onClick={() => {
                  onModalClose()
                }}
              >
                保存修改
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
