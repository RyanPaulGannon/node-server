import prisma from "../prisma/client"

export function postWebUrl(url: any) {
  return prisma.webUrl.create({
    data: { url },
  })
}
