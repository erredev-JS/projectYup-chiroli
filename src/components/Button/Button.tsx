import styles from "./Button.module.css"

export const Button = () => {
  return (
    <div>
        <button type="submit" className={styles.button}>Enviar</button>
    </div>
  )
}
