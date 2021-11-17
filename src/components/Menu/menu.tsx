import React, { createContext, useState } from "react"
import classNames from "classnames"
import { MenuItemProps } from "./menuItem"

type OnSelectType = (selectIndex: number) => void
export interface MenuProps {
  defaultIndex?: number
  className?: string
  style?: React.CSSProperties
  mode?: "vertical" | "horizontal"
  onSelect?: OnSelectType
}

export interface MenuContextProps {
  currentIndex: number
  onSelect?: OnSelectType
}

export const MenuContext = createContext<MenuContextProps>({ currentIndex: 0 })

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, style, mode, children, onSelect } = props
  const [currentIndex, setCurrentIndex] = useState(defaultIndex)

  const classes = classNames("gobye-menu", className, {
    [`gobye-menu-${mode}`]: mode,
  })

  const handleSelectChange = (index: number) => {
    setCurrentIndex(index)
    onSelect && onSelect(index)
  }

  const contextValue: MenuContextProps = {
    currentIndex: currentIndex || 0,
    onSelect: handleSelectChange,
  }

  const renderMenuItem = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === "menuItem") {
        return React.cloneElement(childElement, { index })
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
  defaultIndex: 0,
}

export default Menu
