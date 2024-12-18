import styles from "./ButtonLight.module.css";
import { ReactComponent as IcArrowLineRight } from "../assets/Icon/arrow_line_right.svg";

function ButtonLight({ children }) {
  return (
    <button className={styles.button_light}>
      {children}
      <IcArrowLineRight alt="화살표 아이콘" />
    </button>
  );
}

export default ButtonLight;
