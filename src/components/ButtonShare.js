import styles from "./ButtonShare.module.css";
import { ReactComponent as IcLink } from "../assets/Icon/link.svg";
import { ReactComponent as IcKakaotalk } from "../assets/Icon/kakaotalk.svg";
import { ReactComponent as IcFacebook } from "../assets/Icon/facebook.svg";

function ButtonShare() {
  return (
    <ul className={styles.button_share}>
      <li>
        <IcLink />
      </li>
      <li>
        <IcKakaotalk />
      </li>
      <li>
        <IcFacebook />
      </li>
    </ul>
  );
}

export default ButtonShare;
