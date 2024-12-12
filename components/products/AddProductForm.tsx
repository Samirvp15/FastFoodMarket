"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function AddProductForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }

        //VALIDATE DATA FRONTEND
        const result = ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        //VALIDATE DATA BACKEND
        const response = await createProduct(result.data)
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        toast.success('Producto Creado Correctamente')
        router.push('/admin/products')
    }

    return (
        <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
            <form
                className=' space-y-5'
                action={handleSubmit}
            >
                {children}
                <input
                    className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full
             p-3 uppercase cursor-pointer mt-5'
                    type="submit"
                    value='Registrar Producto' />

            </form>
        </div>
    )
}