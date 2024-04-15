import styles from "./Button.module.css"

const Button = ({children, ...attributes}) => {
  return <button className={styles.button} {...attributes}>
    {children}
  </button>;

};

export default Button;