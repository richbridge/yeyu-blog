import type { NextRequest } from 'next/server'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: '没收到图片啊哥们' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public', 'upload', filename)

  await writeFile(filePath, buffer)

  const url = `/upload/${filename}`
  return NextResponse.json({ url })
}
