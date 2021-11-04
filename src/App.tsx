import Button, { ButtonSize, ButtonType } from "./components/Button/button"

function App() {
  return (
    <div className="App">
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
