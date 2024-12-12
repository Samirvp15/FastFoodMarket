"use client"
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"



export default function ProductSearchForm() {

    const handleProductSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        redirect(`/admin/products/search?search=${result.data.search}`)

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()  // Prevenir el comportamiento predeterminado de envío del formulario

        const formData = new FormData(e.target as HTMLFormElement) // Obtener los datos del formulario
        handleProductSearchForm(formData)  // Llamar a la función que maneja la creación del pedido
    }


    return (
        <form
            onSubmit={handleSubmit}
            className=' flex items-center'>
            <input
                type="text"
                placeholder='Buscar Producto'
                className=' p-2 placeholder-gray-400 w-full'
                name='search'
            />

            <input
                type="submit"
                className=' bg-indigo-600 p-2 uppercase text-white cursor-pointer'
                value="Buscar" />

        </form>
    )
}
