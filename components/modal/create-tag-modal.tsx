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
import {
  createBlogTag,
  createNoteTag,
  getBlogTagsAndNoteTags,
} from '@/actions/tags'
import { useTagStore } from '@/store/use-tag-store'
import { TagType } from '@prisma/client'
import { TAG_NAME_MAX_LENGTH } from '@/config/constant'
import { toast } from 'sonner'

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
      } else if (values.tagType === TagType.NOTE) {
        await createNoteTag(values.tagName)
      } else {
        throw new Error('tag type 不匹配')
      }

      const allTags = await getBlogTagsAndNoteTags()
      setTags(allTags)
    } catch (error) {
      toast.error(`创建标签失败~ ${error}`)
      console.error(`创建标签失败~ ${error}`)
    }
  }

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
                        onValueChange={value => {
                          field.onChange(value)
                          console.log(value, 'value')
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
                <Button type="submit">保存</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
