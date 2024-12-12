
"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function EditProductForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const handleEditProductForm = async (formData: FormData) => {
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
        const response = await updateProduct(result.data, id)
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        toast.success('Producto Actualizado Correctamente')
        router.push('/admin/products')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()  // Prevenir el comportamiento predeterminado de envío del formulario

        const formData = new FormData(e.target as HTMLFormElement) // Obtener los datos del formulario
        handleEditProductForm(formData)  // Llamar a la función que maneja la creación del pedido
    }

    return (
        <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
            <form
                className=' space-y-5'
                onSubmit={handleSubmit}
            >
                {children}
                <input
                    className=' bg-indigo-600 hover:bg-indigo-800 text-white w-full
             p-3 uppercase cursor-pointer mt-5'
                    type="submit"
                    value='Guardar Cambios' />

            </form>
        </div>
    )
}
