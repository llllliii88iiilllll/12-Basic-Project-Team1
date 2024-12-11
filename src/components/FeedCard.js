import styles from "./FeedCard.module.css";
import ProfileImg from "../assets/Images/profile.png";
import Badge from "./Badge";

function FeedCard() {
  return (
    <div className={styles.feed_card_wrap}>
      <div className={styles.feed_card_top}>
        <Badge isActive="true" />
      </div>
      <div className={styles.feed_card_question}>
        <p className={styles.feed_category}>
          질문<span className={styles.feed_date}>&middot;&nbsp;2주전</span>
        </p>
        <p>질문입니다. 질문이에요. 질문이거든요?</p>
      </div>
      <div className={styles.feed_card_answer}>
        <img
          src={ProfileImg}
          alt="사용자 프로필"
          className={styles.feed_profile}
        />
        <ul>
          <li className={styles.feed_user_name}>
            아초는 고양이
            <span className={styles.feed_date}>&middot;&nbsp;2주전</span>
          </li>
          <li className={styles.feed_answer_text}>답변영역입니다.</li>
        </ul>
      </div>
      <hr className={styles.feed_hr} />
      <div className={styles.feed_card_reaction}></div>
    </div>
  );
}

export default FeedCard;
