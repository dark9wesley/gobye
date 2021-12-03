import React from "react"
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
  waitFor,
} from "@testing-library/react"

import Menu, { MenuProps } from "./menu"
import MenuItem from "./menuItem"
import SubMenu from "./subMenu"

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
}

const testVarticalProps: MenuProps = {
  mode: "vertical",
  defaultIndex: "0",
  defaultOpenSubMenus: ["4"],
}

const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>pengyw</MenuItem>
      <SubMenu title="submenu">
        <MenuItem>submenu1</MenuItem>
      </SubMenu>
      <SubMenu title="submenu2">
        <MenuItem>submenu2_2</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleSheet = () => {
  const cssFile = `
    .gobye-submenu {
      display: none;
    }
    .gobye-submenu.menu-opend {
      display: block;
    } 
  `
  const style = document.createElement("style")
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe("test menu and menuItem component", () => {
  beforeEach(() => {
    wrapper = render(<GenerateMenu {...testProps} />)
    wrapper.container.append(createStyleSheet())
    menuElement = wrapper.getByTestId("test-menu")
    activeElement = wrapper.getByText("active")
    disabledElement = wrapper.getByText("disabled")
  })
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass("gobye-menu test")
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5)
    expect(activeElement).toHaveClass("gobye-menu-item menu-active")
    expect(disabledElement).toHaveClass("gobye-menu-item menu-disabled")
  })
  it("click items should change active and call the right call back", () => {
    const thirdItem = wrapper.getByText("pengyw")
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass("menu-active")
    expect(activeElement).not.toHaveClass("menu-active")
    expect(testProps.onSelect).toHaveBeenCalledWith("2")
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass("menu-active")
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1")
  })
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup()
    const wrapper = render(<GenerateMenu {...testVarticalProps} />)
    const menuElement = wrapper.getByTestId("test-menu")
    expect(menuElement).toHaveClass("gobye-menu-vertical")
  })
  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("submenu1")).not.toBeVisible()
    const submenuElement = wrapper.getByText("submenu")
    fireEvent.mouseEnter(submenuElement)
    await waitFor(() => {
      expect(wrapper.queryByText("submenu1")).toBeVisible()
    })
    fireEvent.click(wrapper.getByText("submenu1"))
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0")
    fireEvent.mouseLeave(submenuElement)
    await waitFor(() => {
      expect(wrapper.queryByText("submenu1")).not.toBeVisible()
    })
  })
})

describe("test Menu and MenuItem Component in vertical mode", () => {
  beforeEach(() => {
    wrapper2 = render(<GenerateMenu {...testVarticalProps} />)
    wrapper2.container.append(createStyleSheet())
  })

  it("should render vertical mode when mode is set to vertical", () => {
    const menuElement = wrapper2.getByTestId("test-menu")
    expect(menuElement).toHaveClass("gobye-menu-vertical")
  })

  it("should show dropdown items when click on subMenu for vertical mode", () => {
    const dropItem = wrapper2.getByText("submenu1")
    expect(dropItem).not.toBeVisible()
    fireEvent.click(wrapper2.getByText("submenu"))
    expect(dropItem).toBeVisible()
  })
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
    expect(wrapper2.queryByText("submenu2_2")).toBeVisible()
  })
})
