import { TButton } from './types'
import { FC } from 'react'
import style from "./Button.module.scss"

const Button : FC<TButton> = ({children, ...props}) => {
    return (
        <button className={style.button}  {...props}>{children}</button>
    )
}

export default Button