import { useState } from "react";
import styles from "./ButtonShare.module.css";
import { ReactComponent as IcLink } from "../assets/Icon/link.svg";
import { ReactComponent as IcKakaotalk } from "../assets/Icon/kakaotalk.svg";
import { ReactComponent as IcFacebook } from "../assets/Icon/facebook.svg";

function ButtonShare() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleLinkClick = () => {
    // 현재 URL 클립보드에 복사
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 5000);
      })
      .catch(() => {
        console.error("URL 복사에 실패했습니다.");
      });
  };

  return (
    <ul className={styles.button_share}>
      <li onClick={handleLinkClick}>
        <IcLink />
      </li>
      <li>
        <IcKakaotalk />
      </li>
      <li>
        <IcFacebook />
      </li>
      {toastVisible && (
        <div className={styles.toast}>URL이 복사되었습니다.</div>
      )}
    </ul>
  );
}

export default ButtonShare;
