import styles from "./ButtonDark.module.css";

function ButtonDark({ disabled, children }) {
  return (
    <button className={styles.button_dark} disabled={disabled}>
      {children}
    </button>
  );
}

export default ButtonDark;
