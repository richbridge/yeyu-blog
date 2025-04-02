import { DataTable } from './data-table'
import { columns } from './blog-table-column'

export type blogItem = {
  title: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  tag: string[]
  isPublish: boolean
}

export const blogs: blogItem[] = [
  {
    title: 'A blog',
    status: 'pending',
    tag: ['nextjs', 'react'],
    isPublish: true,
  },
  {
    title: 'B blog',
    status: 'processing',
    tag: ['vue', 'motion'],
    isPublish: false,
  },
  {
    title: 'C blog',
    status: 'processing',
    tag: ['vue', 'motion'],
    isPublish: false,
  },
  {
    title: 'D blog',
    status: 'processing',
    tag: ['vue', 'motion'],
    isPublish: false,
  },
]

export default function BlogListTable() {
  return (
    <main className="bg-slate-600 h-full">
      <DataTable
        columns={columns}
        data={Array(20)
          .fill(0)
          .flatMap(() => blogs)}
      />
    </main>
  )
}
