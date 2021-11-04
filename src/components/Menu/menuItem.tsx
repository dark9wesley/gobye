import React from "react"
import classNames from "classnames"

export interface MenuItemProps {
  index?: number
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, style, disabled, children } = props

  const classes = classNames("goby-menu-item", className, {
    "menu-disable": disabled,
  })

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  disabled: false,
}

export default MenuItem
