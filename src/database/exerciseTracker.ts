import prisma from "../prisma/client"

export function createUser(username: string) {
  return prisma.exerciseTrackerUser.create({
    data: { username },
  })
}

export function checkIfUserExists(username: string) {
  return prisma.exerciseTrackerUser.findUnique({
    where: { username },
  })
}

export async function findUser(username: string) {
  return prisma.exerciseTrackerUser.findUnique({
    where: { username },
    select: {
      username: true,
      id: true,
    },
  })
}

export async function getAllUsers() {
  return prisma.exerciseTrackerUser.findMany({
    select: { username: true, id: true },
  })
}
