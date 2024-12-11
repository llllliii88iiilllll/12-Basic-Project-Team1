import styles from "./Sort.module.css";
import { ReactComponent as IcDown } from "../assets/Icon/arrow_down.svg";
import { ReactComponent as IcUp } from "../assets/Icon/arrow_up.svg";

function Sort() {
  return (
    <div className={styles.sort_wrap}>
      <label className={styles.sort_label_active}>
        이름순
        <IcDown className={styles.sort_default} />
        <IcUp className={styles.sort_active} />
      </label>
      <ul>
        <li>이름순</li>
        <li>최신순</li>
      </ul>
    </div>
  );
}

export default Sort;
