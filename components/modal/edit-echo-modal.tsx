'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { useEffect } from 'react'
import { Echo } from '@prisma/client'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { getAllEchos, updateEchoById } from '@/actions/echos'
import { useEchoStore } from '@/store/use-echo-store'
import { toast } from 'sonner'

const formSchema = z.object({
  // ! 暂时还没确定好长度限制, 之后在考虑
  content: z.string().min(1).max(10_000),
  reference: z.string().min(1).max(50),
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

  const form = useForm<EchoForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      reference: '',
      isPublished: isPublished,
    },
  })

  const initialValues = {
    content: content ?? '',
    reference: reference ?? '',
    isPublished: isPublished ?? true,
  }

  useEffect(() => {
    form.reset(initialValues)

    return () => {
      form.reset(initialValues)
    }
  }, [content, isPublished, reference])

  const handleEditEcho = async (values: EchoForm) => {
    if (!id) {
      throw new Error('echo id 不存在')
    }
    try {
      await updateEchoById({ ...values, id })
      const echos = await getAllEchos()
      setEchos(echos)
      onModalClose()
    } catch (error) {
      toast.error(`更新短语失败~ ${error}`)
      console.error('更新短语失败~', error)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleEditEcho(values)
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
          <DialogTitle>编辑短语</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>短语</FormLabel>
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
                        onCheckedChange={checked => {
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
