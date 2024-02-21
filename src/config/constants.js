import { FiFilePlus } from "react-icons/fi"; 
import { FiFolderPlus } from "react-icons/fi"; 
import { BsBasket3 } from "react-icons/bs"; 
import { BiCategoryAlt } from "react-icons/bi"; 
const btnData = [
    {
        id : 1,
        icon : BiCategoryAlt,
        title : 'Categories',
        path : '/'
    },
    {
        id : 2,
        icon : BsBasket3,
        title : 'Products',
        path : '/products'
    },
    {
        id : 3,
        icon : FiFolderPlus,
        title : 'Create Categories',
        path : '/create-category'
    },
    {
        id : 4,
        icon : FiFilePlus,
        title : 'Create Product',
        path : '/create-product'
    }
]

export default btnData