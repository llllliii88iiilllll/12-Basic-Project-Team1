import MessageImg from "../assets/Icon/messages.svg";
import CloseImg from "../assets/Icon/close.svg";
import styles from "./Modal.module.css";
import Profile from "../assets/Images/profile.png";
import { useState } from "react";

const Modal = ({ onClose }) => {
  const [question, setQuestion] = useState("");

  const heandleTextareaChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_header}>
        <img
          className={styles.message_img}
          src={MessageImg}
          alt="메세지 이미지"
        />
        <h1>질문을 작성하세요</h1>
        <img
          className={styles.close_img}
          src={CloseImg}
          alt="닫기 버튼"
          onClick={onClose}
        />
      </div>
      <div className={styles.modal_title}>
        <p>To.</p>
        <img src={Profile} alt="프로필이미지" />
        <h2>아초는고양이</h2>
      </div>
      <textarea
        className={styles.modal_textarea}
        placeholder="질문을 입력해주세요"
        value={question}
        onChange={heandleTextareaChange}
      ></textarea>
      <button
        className={styles.modal_btn}
        type="submit"
        disabled={!question.trim()}
      >
        질문 보내기
      </button>
    </div>
  );
};

export default Modal;

{
  /* <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>질문 작성하기</h2>
        <textarea placeholder="질문을 입력하세요"></textarea>
        <div className={styles.modal_buttons}>
          <button onClick={onClose}>취소</button>
          <button>작성</button>
        </div>
      </div>
    </div> */
}
