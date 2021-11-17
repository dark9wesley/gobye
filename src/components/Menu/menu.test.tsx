import React from "react"
import {
  fireEvent,
  render,
  RenderResult,
  cleanup,
} from "@testing-library/react"

import Menu, { MenuProps } from "./menu"
import MenuItem from "./menuItem"

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
}

const testVarticalProps: MenuProps = {
  mode: "vertical",
  defaultIndex: 0,
}

const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>pengyw</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement

describe("test menu and menuItem component", () => {
  beforeEach(() => {
    wrapper = render(<GenerateMenu {...testProps} />)
    menuElement = wrapper.getByTestId("test-menu")
    activeElement = wrapper.getByText("active")
    disabledElement = wrapper.getByText("disabled")
  })
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass("gobye-menu test")
    expect(menuElement.getElementsByTagName("li").length).toEqual(3)
    expect(activeElement).toHaveClass("goby-menu-item menu-active")
    expect(disabledElement).toHaveClass("goby-menu-item menu-disabled")
  })
  it("click items should change active and call the right call back", () => {
    const thirdItem = wrapper.getByText("pengyw")
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass("menu-active")
    expect(activeElement).not.toHaveClass("menu-active")
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass("menu-active")
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup()
    const wrapper = render(<GenerateMenu {...testVarticalProps} />)
    const menuElement = wrapper.getByTestId("test-menu")
    expect(menuElement).toHaveClass("gobye-menu-vertical")
  })
})
