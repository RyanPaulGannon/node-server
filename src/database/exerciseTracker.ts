import prisma from "../prisma/client"

export function createUser(username: string) {
  return prisma.user.create({
    data: { username },
  })
}

export function checkIfUserExists(username: string) {
  return prisma.user.findUnique({
    where: { username },
  })
}

export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      id: true,
    },
  })
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      id: true,
    },
  })
}

export async function getAllUsers() {
  return prisma.user.findMany({
    select: { username: true, id: true },
  })
}

export async function addExerciseData(id: string) {
  return prisma.exercise.findFirst({})
}
