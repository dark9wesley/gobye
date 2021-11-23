import React, { useContext, useState } from "react"
import classNames from "classnames"
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem"

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const { currentIndex, mode, defaultOpenSubMenus } = useContext(MenuContext)
  const openedSubMenus = defaultOpenSubMenus as Array<string>
  const isOpend =
    mode === "vertical" && index ? openedSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpend)

  const classes = classNames("gobye-menu-item gobye-submenu-item", className, {
    "menu-active": currentIndex === index,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    setTimeout(() => setMenuOpen(toggle), 0.5)
  }

  const clickEvent =
    mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {}

  const mouseEvent =
    mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
        }
      : {}

  const renderChildren = () => {
    const subMenuClasses = classNames("gobye-submenu", {
      "menu-opend": menuOpen,
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childrenElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childrenElement.type
      if (displayName === "menuItem") {
        return React.cloneElement(childrenElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component "
        )
      }
    })

    return <ul className={subMenuClasses}>{childrenComponent}</ul>
  }

  return (
    <li key={index} className={classes} {...mouseEvent}>
      <div className="gobye-submenu-title" {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "subMenu"

export default SubMenu
