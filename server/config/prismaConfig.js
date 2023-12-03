import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient({
    log:["info"]
})

export {prisma}