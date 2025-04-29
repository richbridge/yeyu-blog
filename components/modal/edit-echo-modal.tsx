'use client'

import type { Echo } from '@prisma/client'
import { getAllEchos, updateEchoById } from '@/actions/echos'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
  content: z
    .string()
    .min(1, { message: 'echo 不能为空' })
    .max(ECHO_CONTENT_MAX_LENGTH, { message: 'echo 长度过长' }),
  reference: z
    .string()
    .min(1, { message: '来源不能为空' })
    .max(ECHO_REFERENCE_MAX_LENGTH, { message: '来源长度过长' }),
  isPublished: z.boolean(),
})

type EchoForm = z.infer<typeof formSchema>

export type OmitCreatedAtEcho = Omit<Echo, 'createdAt'>

export default function EditEchoModal() {
  const { modalType, onModalClose, payload } = useModalStore()
  const isModalOpen = modalType === 'editEchoModal'
  const { setEchos } = useEchoStore()

  const { id, content, isPublished, reference } = payload
    ? (payload as OmitCreatedAtEcho)
    : {}

  const initialValues = {
    content: content ?? '',
    reference: reference ?? '',
    isPublished: isPublished ?? true,
  }

  const form = useForm<EchoForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      reference: '',
      isPublished,
    },
  })

  useEffect(() => {
    if (isModalOpen) {
      form.reset(initialValues)
    }
  }, [isModalOpen])

  const handleEditEcho = async (values: EchoForm) => {
    if (!id) {
      throw new Error('echo id 不存在')
    }

    await updateEchoById({ ...values, id })
    const echos = await getAllEchos()
    setEchos(echos)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleEditEcho(values)
      toast.success('修改成功~')
      onModalClose()
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(`更新 echo 失败~ ${error.message}`)
      }
      else {
        toast.error('更新 echo 失败~')
      }
    }
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        form.reset(initialValues)
        onModalClose()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>编辑引用</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>引用</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none h-52"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reference"
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
                    <FormLabel className="text-lg">是否发布</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                        }}
                      />
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
