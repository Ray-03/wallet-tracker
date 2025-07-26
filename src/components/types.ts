export interface NavIconProps {
  icon?: string | object
  alt?: string
  name?: string
}

export interface INavLink extends NavIconProps {
  href: string
}
