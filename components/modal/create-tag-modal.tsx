'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { createBlogTag, createNoteTag } from '@/actions/tags'

const formSchema = z.object({
  tagName: z.string().min(1).max(20),
  tagType: z.enum(['Blog', 'Note']),
})

export type TagValues = z.infer<typeof formSchema>

export default function CreateTagModal() {
  const { modalType, onModalClose } = useModalStore()
  const isModalOpen = modalType === 'createTagModal'

  const form = useForm<TagValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: '',
      tagType: 'Blog',
    },
  })

  const handleCreateTag = async (values: TagValues) => {
    try {
      if (values.tagType === 'Blog') {
        const r = await createBlogTag(values.tagName)
        console.log(r, 'blog tag res')
      } else if (values.tagType === 'Note') {
        const r = await createNoteTag(values.tagName)
        console.log(r, 'note tag res')
      } else {
        throw new Error('tag type 不匹配')
      }
    } catch (error) {
      console.error('创建标签失败~', error)
    } finally {
      onModalClose()
    }
  }

  function onSubmit(values: TagValues) {
    handleCreateTag(values)
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建标签</DialogTitle>
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
                      <Input placeholder="请输入标签名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tagType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标签类型</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={value => {
                          field.onChange(value)
                          console.log(value, 'value')
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="请选择" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Blog">Blog</SelectItem>
                          <SelectItem value="Note">Note</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </form>
          </Form>
          )
        </div>
      </DialogContent>
    </Dialog>
  )
}
