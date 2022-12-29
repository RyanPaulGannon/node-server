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
