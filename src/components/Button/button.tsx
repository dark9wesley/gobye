import React from "react"
import classNames from "classnames"

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

interface BaseButtonProp {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  href?: string
}

type NativeButtonProps = BaseButtonProp &
  React.ButtonHTMLAttributes<HTMLElement>

type AnchorButtonProps = BaseButtonProp &
  React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const { children, btnType, disabled, size, href, className, ...resetProps } =
    props

  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  })

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...resetProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...resetProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button
