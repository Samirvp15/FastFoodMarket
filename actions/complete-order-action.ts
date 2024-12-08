"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"



export async function completeOrder(formData: FormData) {

    const orderId = formData.get('order_id')!
        
    try {
        await prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })

        // PARA REFRESCAR LOS DATOS NUEVOS QUE VENGAN DE LA DB
        // REVALIDATION DATA CON NEXT
        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }
}
