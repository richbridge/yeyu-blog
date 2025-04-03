import { PrismaClient } from '@prisma/client'
import fs from 'fs'

export const prisma = new PrismaClient()

const filePath = `md/2.md`
const fileContent = fs.readFileSync(filePath, 'utf-8')
const randomTag = [
  'general',
  '微信读书',
  '思考',
  '个人成长',
  '学习',
  '测试..',
  '好累',
] as const

async function main() {
  // await mockData(50)
  // console.log('over')
}

async function mockData(count: number) {
  return Promise.all(
    Array(count)
      .fill(0)
      .map(async _ => {
        await prisma.note.create({
          data: {
            title: `笔记测试 ${generateRandomString()}`,
            slug: `life-style-${generateRandomString()}`,
            tags: {
              create: getRandomTags().map(tagName => ({
                tag: {
                  connectOrCreate: {
                    where: { tagName },
                    create: { tagName },
                  },
                },
              })),
            },
            content: fileContent,
          },
        })
      }),
  )
}

function generateRandomString(length: number = 8): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length)
}
function getRandomTags(): string[] {
  const shuffled = [...randomTag].sort(() => Math.random() - 0.5) // 随机打乱
  const count = Math.floor(Math.random() * 3) + 1 // 随机选 1~3 个
  return shuffled.slice(0, count)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
