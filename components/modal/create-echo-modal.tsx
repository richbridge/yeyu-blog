'use client'

import { createEcho, getAllEchos } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  ECHO_CONTENT_MAX_LENGTH,
  ECHO_REFERENCE_MAX_LENGTH,
} from '@/config/constant'
import { useEchoStore } from '@/store/use-echo-store'
import { useModalStore } from '@/store/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  echoContent: z
    .string()
    .min(1, { message: 'echo 不能为空' })
    .max(ECHO_CONTENT_MAX_LENGTH, { message: 'echo 长度过长' }),
  echoReference: z
    .string()
    .min(1, { message: '来源不能为空' })
    .max(ECHO_REFERENCE_MAX_LENGTH, { message: '来源长度过长' }),
  isPublished: z.boolean(),
})

export type EchoValues = z.infer<typeof formSchema>

export default function CreateEchoModal() {
  const { modalType, onModalClose } = useModalStore()
  const isModalOpen = modalType === 'createEchoModal'
  const { setEchos } = useEchoStore()

  const form = useForm<EchoValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      echoContent: '',
      echoReference: '',
      isPublished: true,
    },
  })

  const handleCreateEcho = async (values: EchoValues) => {
    try {
      await createEcho(values)
      const echos = await getAllEchos()
      setEchos(echos)
      toast.success(`创建成功~`)
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(`创建 echo 失败 ${error.message}`)
      }
      else {
        toast.error(`创建 echo 失败`)
      }
    }
  }

  function onSubmit(values: EchoValues) {
    handleCreateEcho(values)
    onModalClose()
  }

  useEffect(() => {
    if (!isModalOpen) {
      form.reset()
    }
  }, [isModalOpen])

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建引用</DialogTitle>
          <DialogDescription>又看到什么有意思的东西了嘛~</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="echoContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>引用</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="请输入新的引用"
                        {...field}
                        className="resize-none h-52"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="echoReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>来源</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入来源" {...field} />
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
                    <FormLabel>是否发布</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">保存修改</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
