import React, { useContext } from "react"
import classNames from "classnames"
import { MenuContext } from "./menu"

export interface MenuItemProps {
  index?: number
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, style, disabled, children } = props

  const { currentIndex, onSelect } = useContext(MenuContext)

  const classes = classNames("goby-menu-item", className, {
    "menu-disabled": disabled,
    "menu-active": index === currentIndex,
  })

  const handleClick = () => {
    if (onSelect && !disabled && typeof index === "number") {
      onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = "menuItem"

export default MenuItem
