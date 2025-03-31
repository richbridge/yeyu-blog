import { PrismaClient } from '@prisma/client'
import fs from 'fs'

export const prisma = new PrismaClient()

const filePath = `md/2.md`
const fileContent = fs.readFileSync(filePath, 'utf-8')
const randomTag = [
  'Nextjs',
  'React',
  'Vue',
  'JavaScript',
  'TypeScript',
  'Go',
  'remix',
] as const

async function main() {
  // await mockData(24)
}

async function mockData(count: number) {
  return Promise.all(
    Array(count)
      .fill(0)
      .map(async _ => {
        await prisma.blog.create({
          data: {
            title: `nextjs 开发指南 + ${generateRandomString()}`,
            // * slug 不能包含 + 号, 忘了🤡
            slug: `nextjs-dev-guide-${generateRandomString()}`,
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
