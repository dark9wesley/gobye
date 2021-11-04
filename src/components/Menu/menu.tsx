import React from "react"
import classNames from "classnames"

export interface MenuProps {
  defaultIndex?: number
  className?: string
  style?: React.CSSProperties
  mode?: "vertical" | "horizontal"
  onSelect?: (selectIndex?: number) => void
}

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, style, mode, children } = props

  const classes = classNames("gobye-menu", className, {
    [`gobye-menu-${mode}`]: mode,
  })

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}

Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: 0,
}

export default Menu
