export interface NavIconProps {
  icon?: string | object
  alt?: string
  name?: string
}

export interface INavLink extends NavIconProps {
  href: string
}

export enum NavSection {
  Home = 'Home',
  Wallet = 'Wallet',
  History = 'History',
  Cart = 'Cart',
  Search = 'Search',
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

import { type WalletError } from '@/utils/errors'

export interface ProductsState {
  products: Product[]
  product: Product | null
  loading: boolean
  error: WalletError | null
}
