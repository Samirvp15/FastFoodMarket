"use client"




export default function AddProductForm({children}: {children: React.ReactNode}) {

    const handleSubmit = async (formData: FormData) => {
        console.log('xdd')
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
