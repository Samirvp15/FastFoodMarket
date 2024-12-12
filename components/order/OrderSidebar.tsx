import { getCategories } from '@/actions/get-categories-action'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

async function getCategoriesFromAction() {
    return await getCategories()
}

const categories = await getCategoriesFromAction()

export default  function OrderSidebar() {


  return (
    <aside className=" md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className='mt-10'>
        {categories.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>

    </aside>
  )
}
