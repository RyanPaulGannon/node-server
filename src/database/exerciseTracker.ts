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

export function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      id: true,
    },
  })
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      id: true,
    },
  })
}

export function getAllUsers() {
  return prisma.user.findMany({
    select: { username: true, id: true },
  })
}

export function addExerciseData(
  description: string,
  duration: number,
  date: Date,
  userId: string
) {
  return prisma.exercise.create({
    data: {
      description,
      duration,
      date,
      userId,
    },
  })
}
