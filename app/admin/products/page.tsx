import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";


async function productCount() {

  return await prisma.product.count()
}



async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })

  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>


export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ page: string }> }) {

  const page = +(await searchParams).page || 1
  const pageSize = 10

  const productsData = await getProducts(page, pageSize)
  const totalProductsData = await productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)


  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className=" flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={`/admin/products/new`}
          className=" bg-amber-400 w-full lg:w-auto text-lg px-10 py-3
            text-center font-bold cursor-pointer"
        >Crear producto</Link>

        <ProductSearchForm />
      </div>

      <ProductTable
        products={products}
      />


      <ProductsPagination
        page={page}
        totalProducts={totalProducts}
        totalPages={totalPages}
      />
    </>
  )
}
