import prisma from "../prisma/client"

export function postUrlData(url: string) {
  return prisma.webUrl.create({
    data: { url },
  })
}

export async function getUrlData(href: string) {
  return prisma.webUrl.findUnique({
    where: {
      url: href,
    },
  })
}

export async function checkIfUrlExists(href: string) {
  return prisma.webUrl.findUnique({
    where: {
      url: href,
    },
  })
}

export async function getUrlIdData(id: string) {
  return prisma.webUrl.findUnique({
    where: {
      id,
    },
  })
}
