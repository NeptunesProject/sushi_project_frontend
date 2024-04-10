import { ReactNode } from 'react'

enum Languages {
  en = 'EN',
  pl = 'PL',
  ua = 'UA',
  ru = 'RU',
}

interface Product {
  id: number
  name: string
  nameRu: string
  nameEn: string
  nameUa: string
  price: number
  categoryId: number
  allergensId: number
  weight: number
  url: string
  img: string
  status: number
  cityId: number
  size: number
  sale: number
  iikoId: string
  cartCount: number
  sort: number
  box: number
}

interface Category {
  id: number
  name: string
  nameUa: string
  nameRu: string
  nameEn: string
  url: string
  img: string
}

interface ChakraFactoryComponent {
  className?: string
  children?: ReactNode | ReactNode[]
}

interface ClientInfo {
  phoneNumber: string
  name: string
}

interface DeliveryAddress {
  clientAddress: string
}

interface CartItem {
  id: string
  quantity: number
}

interface ReturnedOrder {
  id: number
  toDateTime: string
  clientInfo: ClientInfo
  deliveryAddress: DeliveryAddress
  comment: string
  peopleCount: number
  cartItems: CartItem[]
  sticksCount: number
  studySticksCount: number
  deliveryType: string
  paymentType: 'ONLINE' | 'CASH' //temporaly until payment is done
  statusType: 'CREATED' //temporaly because there is no information
}

type OrderToPost = Omit<ReturnedOrder, 'statusType' | 'id'>

interface ProductObj {
  count: number
  product: Product
}

type BasketTypes = 'basket' | 'delivery' | 'pay'

export type {
  Languages,
  Product,
  ChakraFactoryComponent,
  BasketTypes,
  Category,
  OrderToPost,
  ProductObj,
  ReturnedOrder,
  CartItem,
}
