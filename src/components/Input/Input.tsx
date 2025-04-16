import { ChangeEvent, FC } from "react"
import styles from "./Input.module.css"

interface Iinput {
    label: string,
    name: string,
    value: string,
    type:string,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    error?: string
}

export const Input:FC<Iinput> = ({label, name, value, type, handleChange, error}) => {

  return (
    <div className={styles.inputContainer}>
        <label htmlFor={name}>{label}</label>
        <input className={styles.input} id={name} name={name} type={type} value={value} onChange={handleChange}/>

        {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
