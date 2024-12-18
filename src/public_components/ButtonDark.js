import { Link } from "react-router-dom";
import styles from "./ButtonDark.module.css";

function ButtonDark({ disabled, children, to }) {
  return (
    <Link to="{to}">
      <button className={styles.button_dark} disabled={disabled}>
        {children}
      </button>
    </Link>
  );
}

export default ButtonDark;
