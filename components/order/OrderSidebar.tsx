import {prisma} from '@/src/lib/prisma'

async function getCategories(){
  const categories = await prisma.category.findMany()
  console.log(categories)
}


export default async function OrderSidebar() {

  await getCategories()

  return (
   <aside className=" md:w-72 md:h-screen bg-white">
    OrderSidebar
   </aside>
  )
}
