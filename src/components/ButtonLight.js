import styles from "./Button.module.css";
import { ReactComponent as IcArrowLineRight } from "../assets/Icon/arrow_line_right.svg";

function ButtonLight() {
  return (
    // <Link to="">
    <button className={styles.button_light}>
      질문하러 가기
      <IcArrowLineRight alt="화살표 아이콘" />
    </button>
    // </Link>
  );
}

export default ButtonLight;
