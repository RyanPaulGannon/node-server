import prisma from "../prisma/client"

export function createUser(username: string) {
  return prisma.exerciseTrackerUser.create({
    data: { user: username },
  })
}

export function checkIfUserExists(username: string) {
  return prisma.exerciseTrackerUser.findUnique({
    where: { user: username },
  })
}

export async function findUser(username: string) {
  return prisma.exerciseTrackerUser.findUnique({
    where: { user: username },
    select: {
      id: true,
      user: true,
    },
  })
}

export async function getAllUsers() {
  return prisma.exerciseTrackerUser.findMany({
    select: { id: true, user: true },
  })
}
