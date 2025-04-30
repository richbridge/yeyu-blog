'use client'

import {
  createBlogTag,
  createNoteTag,
  getAllTags,
} from '@/actions/tags'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  tagName: z.string().min(1).max(TAG_NAME_MAX_LENGTH),
  tagType: z.nativeEnum(TagType),
})

export type TagValues = z.infer<typeof formSchema>

export default function CreateTagModal() {
  const { modalType, onModalClose } = useModalStore()
  const isModalOpen = modalType === 'createTagModal'
  const { setTags } = useTagStore()

  const form = useForm<TagValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagName: '',
      tagType: TagType.BLOG,
    },
  })

  const handleCreateTag = async (values: TagValues) => {
    try {
      if (values.tagType === TagType.BLOG) {
        await createBlogTag(values.tagName)
      }
      else if (values.tagType === TagType.NOTE) {
        await createNoteTag(values.tagName)
      }
      else {
        throw new Error('tag type 不匹配')
      }

      const allTags = await getAllTags()
      setTags(allTags)
      toast.success(`创建成功`)
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(`创建标签失败~ ${error.message}`)
      }
      else {
        toast.error(`创建标签失败~`)
      }
    }
  }

  useEffect(() => {
    form.reset()
  }, [isModalOpen, form])

  function onSubmit(values: TagValues) {
    handleCreateTag(values)
    onModalClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建标签</DialogTitle>
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
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="请选择" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={TagType.BLOG}>BLOG</SelectItem>
                          <SelectItem value={TagType.NOTE}>NOTE</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="cursor-pointer">保存</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
