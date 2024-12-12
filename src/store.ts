import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";


export type ProductItem = {

        name: string;
        id: number;
        price: number;
        image?: string;
        categoryId?: number;
    
}


interface Store {
    order: OrderItem[],
    addToOrder: (product: ProductItem) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    removeItem: (id: Product['id']) => void,
    clearOrder: () => void
}


export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        //const { data } = product

        let order: OrderItem[] = []

        //  PARA EVITAR ITEMS DUPLICADOS
        if (get().order.find(item => item.id === product.id)) {
            //INCREMENTAR SU CANTIDAD Y NO DUPLICADOS
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...product,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)

        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: ()=>{
        set(()=>({
            order: []
        }))
    }
}))



