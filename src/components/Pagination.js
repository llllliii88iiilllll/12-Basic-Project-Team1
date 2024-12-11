import styles from "./Pagination.module.css";
import { ReactComponent as IcArrowRight } from "../assets/Icon/arrow_right.svg";
import { ReactComponent as IcArrowLeft } from "../assets/Icon/arrow_left.svg";

function Pagination() {
  return (
    <ul className={styles.pagination}>
      <li className={styles.prev_button}>
        <IcArrowLeft />
      </li>
      <li className={styles.active}>1</li>
      <li>2</li>
      <li className={styles.next_button}>
        <IcArrowRight />
      </li>
    </ul>
  );
}

export default Pagination;
