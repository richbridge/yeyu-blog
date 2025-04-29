import { deleteBlogById } from '@/actions/blogs'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBlogStore } from '@/store/use-blog-store'
import { useModalStore } from '@/store/use-modal-store'
import { Edit2, Eye, Trash } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function ActionButtons({
  blogId,
  slug,
  title,
}: {
  blogId: number
  slug: string
  title: string
}) {
  const { setModalOpen } = useModalStore()
  const { blogs, setBlogs } = useBlogStore()

  const handleDelete = async () => {
    try {
      await deleteBlogById(blogId)
      const filtered = blogs.filter(blog => blog.id !== blogId)
      setBlogs(filtered)
    }
    catch (error) {
      if (error instanceof Error) {
        toast.error(`删除 「${title}」 出错~ ${error?.message}`)
      }
      else {
        toast.error(`删除 「${title}」 出错~`)
      }
    }
  }

  return (
    <section className="flex items-center gap-1">
      <Link
        href={`/blog/${slug}`}
        className={cn(
          buttonVariants({ variant: 'outline', className: 'size-8' }),
        )}
      >
        <Eye className="size-4" />
      </Link>

      <Link
        href={`blog/edit/${slug}`}
        className={cn(
          buttonVariants({ variant: 'outline', className: 'size-8' }),
        )}
      >
        <Edit2 className="size-4" />
      </Link>

      <Button
        variant="outline"
        className="size-8 text-red-600"
        onClick={() => setModalOpen('deleteArticleModal', handleDelete)}
      >
        <Trash className="size-4" />
      </Button>
    </section>
  )
}
