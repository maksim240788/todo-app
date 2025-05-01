import { PrismaClient, Prisma } from '../generated/prisma'

const prisma = new PrismaClient()

const userData: Prisma.TodoCreateInput[] = [
  {
    title: 'First TODO',
    completed: false
  },
  {
    title: 'Second TODO',
    completed: true
  },
  {
    title: 'Third TODO',
    completed: false
  },
]

export async function main() {
  for (const u of userData) {
    await prisma.todo.create({ data: u })
  }
}

main()