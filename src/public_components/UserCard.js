import styles from "./UserCard.module.css";
import ProfileImg from "../assets/Images/profile.png";
import { ReactComponent as IcMessages } from "../assets/Icon/messages.svg";

function UserCard() {
  return (
    <div className={styles.user_card_wrap}>
      <div className={styles.user_card}>
        <div className={styles.user_card_top}>
          <img
            src={ProfileImg}
            alt="프로필 이미지"
            className={styles.user_profile}
          />
          <p className={styles.user_name}>아초는 고양이</p>
        </div>
        <ul className={styles.user_card_bottom}>
          <li>
            <IcMessages />
            받은 질문
          </li>
          <li>9개</li>
        </ul>
      </div>
      <div className={styles.user_card}>
        <div className={styles.user_card_top}>
          <img
            src={ProfileImg}
            alt="프로필 이미지"
            className={styles.user_profile}
          />
          <p className={styles.user_name}>아초는 고양이</p>
        </div>
        <ul className={styles.user_card_bottom}>
          <li>
            <IcMessages />
            받은 질문
          </li>
          <li>9개</li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;
