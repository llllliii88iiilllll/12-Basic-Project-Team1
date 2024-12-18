import MessageImg from "../assets/Icon/messages.svg";
import CloseImg from "../assets/Icon/close.svg";
import styles from "./Modal.module.css";
import { useState } from "react";

const Modal = ({ onClose, userData }) => {
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
        <img src={userData.imageSource} alt="프로필이미지" />
        <h2>{userData.name}</h2>
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
