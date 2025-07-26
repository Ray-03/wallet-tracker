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
