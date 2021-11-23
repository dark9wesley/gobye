import React, { createContext, useState } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menuItem"

type OnSelectType = (selectIndex: string) => void

type MenuMode = "vertical" | "horizontal"

export interface MenuProps {
  defaultIndex?: string
  className?: string
  style?: React.CSSProperties
  mode?: MenuMode
  onSelect?: OnSelectType
  defaultOpenSubMenus?: Array<string>
}

export interface MenuContextProps {
  currentIndex: string
  onSelect?: OnSelectType
  mode?: MenuMode
  defaultOpenSubMenus?: Array<string>
}

export const MenuContext = createContext<MenuContextProps>({
  currentIndex: "0",
})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    style,
    mode,
    children,
    onSelect,
    defaultOpenSubMenus,
  } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  const classes = classNames("gobye-menu", className, {
    [`gobye-menu-${mode}`]: mode,
  })

  const handleSelectChange = (index: string) => {
    setCurrentIndex(index)
    onSelect && onSelect(index)
  }

  const contextValue: MenuContextProps = {
    currentIndex: currentIndex || "0",
    onSelect: handleSelectChange,
    mode,
    defaultOpenSubMenus,
  }

  const renderMenuItem = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === "menuItem" || displayName === "subMenu") {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component "
        )
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid={"test-menu"}>
      <MenuContext.Provider value={contextValue}>
        {renderMenuItem()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: "horizontal",
  defaultIndex: "0",
  defaultOpenSubMenus: [],
}

export default Menu
