import { prisma } from '@/db'
import AdminEchoPage from '@/modules/admin/admin-echo-page'

export default async function Page() {
  const echos = await prisma.echo.findMany()

  return <AdminEchoPage echos={echos} />
}
