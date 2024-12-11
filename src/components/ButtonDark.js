import styles from "./Button.module.css";

function ButtonDark({ disabled, children }) {
  return (
    // <Link to="">
    <button className={styles.button_dark} disabled={disabled}>
      {children}
    </button>
    // </Link>
  );
}

export default ButtonDark;
