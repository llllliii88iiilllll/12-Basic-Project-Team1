import styles from "./UserCard.module.css";
import { ReactComponent as IcMessages } from "../assets/Icon/messages.svg";
import { Link } from "react-router-dom";
import EmptyBox from "../assets/Images/empty.png";
import IcMessage from "../assets/Icon/messages.svg";
import ButtonDark from "../public_components/ButtonDark";

function UserCard({ items }) {
  return (
    <div className={styles.user_card_wrap}>
      {items.length > 0 ? (
        items.map((item) => (
          <Link to={`/post/${item.id}`} key={item.id}>
            <div className={styles.user_card}>
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
          </Link>
        ))
      ) : (
        <>
          <div className={styles.empty_item}>
            <p>
              <img src={IcMessage} alt="메시지 아이콘" />
              아직 답변자가 없습니다.
            </p>
            <EmptyBox alt="빈박스 이미지" />
            <ButtonDark disabled={false}>메인페이지로 이동하기</ButtonDark>
          </div>
        </>
      )}
    </div>
  );
}
export default UserCard;
