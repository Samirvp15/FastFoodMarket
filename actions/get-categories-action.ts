"use server"

import { prisma } from "@/src/lib/prisma";


export async function getCategories() {
    return await prisma.category.findMany()
}