import Button, { ButtonSize, ButtonType } from "./components/Button/button"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"
import SubMenu from "./components/Menu/subMenu"

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={"0"} mode="vertical" defaultOpenSubMenus={["3"]}>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem disabled>3</MenuItem>
        <SubMenu title="122">
          <MenuItem>1</MenuItem>
          <MenuItem>2</MenuItem>
        </SubMenu>
      </Menu>
      <Button onClick={() => console.log(111)}>按钮1</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large} disabled>
        按钮2
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Large Danger
      </Button>
      <Button
        btnType={ButtonType.Link}
        size={ButtonSize.Large}
        href={"www.baidu.com"}
      >
        链接按钮
      </Button>
    </div>
  )
}

export default App
