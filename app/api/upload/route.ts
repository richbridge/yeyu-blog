import type { NextRequest } from 'next/server'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: '没收到图片看哥们' }, { status: 400 })
  }

  // 获取文件内容为 Buffer
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // 保存到 public/uploads/xxx.jpg
  const filename = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public', 'upload', filename)

  await writeFile(filePath, buffer)

  // 构造可访问 URL
  const url = `/upload/${filename}`
  return NextResponse.json({ url })
}
