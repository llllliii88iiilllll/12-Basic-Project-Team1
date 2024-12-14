import styles from "./UserCard.module.css";
import { ReactComponent as IcMessages } from "../assets/Icon/messages.svg";

function UserCard({ items }) {
  return (
    <div className={styles.user_card_wrap}>
      {items.length > 0 ? (
        items.map((item) => (
          <div className={styles.user_card} key={items.id}>
            <div className={styles.user_card_top}>
              <img
                src={item.imageSource}
                alt="프로필 이미지"
                className={styles.user_profile}
              />
              <p className={styles.user_name}>{item.name}</p>
            </div>
            <ul className={styles.user_card_bottom}>
              <li>
                <IcMessages />
                받은 질문
              </li>
              <li>{item.questionCount}개</li>
            </ul>
          </div>
        ))
      ) : (
        <p>아무것도 없습니다. 이 부분을 꾸며야합니다</p>
      )}
    </div>
  );
}
export default UserCard;
