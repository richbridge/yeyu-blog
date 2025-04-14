import { Code } from 'lucide-react'
import Link from 'next/link'

const AdminLogo = () => {
  return (
    <Link
      className="flex items-center gap-1 px-4 py-1 rounded-lg hover:bg-primary-foreground duration-200"
      href={'/'}
    >
      <h2>☘️ 🐟 后台管理</h2>
      <Code size={18} />
    </Link>
  )
}

export default AdminLogo
