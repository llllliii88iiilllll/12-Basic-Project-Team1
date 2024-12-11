import styles from "./FeedCard.module.css";
import ProfileImg from "../assets/Images/profile.png";
import InputTextArea from "./InputTextArea";
import ButtonDark from "./ButtonDark";

function FeedCardAnswer() {
  return (
    <>
      <div className={styles.feed_answer_wrap}>
        <div>
          <img
            src={ProfileImg}
            alt="사용자 프로필"
            className={styles.feed_profile}
          />
        </div>
        <ul>
          <li className={styles.feed_user_name}>
            아초는 고양이
            <span className={styles.feed_date}>&middot;&nbsp;2주전</span>
          </li>
          <InputTextArea />
          <ButtonDark disabled="true">답변 완료</ButtonDark>
          <li className={styles.feed_answer_text}>답변영역입니다.</li>
          <li className={styles.feed_answer_rejected}>답변 거절</li>
        </ul>
      </div>
    </>
  );
}

export default FeedCardAnswer;
