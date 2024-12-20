import { useState } from "react";
import { postQuestion } from "../apis/PostQuestion";
import MessageImg from "../assets/Icon/messages.svg";
import CloseImg from "../assets/Icon/close.svg";
import styles from "./Modal.module.css";

const Modal = ({ onClose, userData, subjectId, setQuestions }) => {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextareaChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    if (!question.trim()) return; // 빈 질문은 제출 불가
    setIsSubmitting(true);

    try {
      const result = await postQuestion({
        subjectId,
        question,
      });
      console.log("질문이 성공적으로 전송되었습니다:", result);
      setQuestion(""); // 텍스트 초기화
      onClose(); // 모달 닫기

      // 새로 추가된 질문을 questions 배열에 추가
      setQuestions((prevQuestions) => [
        {
          id: result.id, // 새 질문의 ID
          subjectId: result.subjectId, // subjectId
          content: question, // 새 질문 내용
          like: 0, // 초기값 설정
          dislike: 0, // 초기값 설정
          createdAt: new Date().toISOString(), // 현재 시간
          answerContent: null, // 아직 답변이 없음
          answerCreatedAt: null, // 아직 답변이 없음
        },
        ...prevQuestions,
      ]);
    } catch (error) {
      console.error("질문 전송 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        onChange={handleTextareaChange}
        disabled={isSubmitting}
      ></textarea>
      <button
        className={styles.modal_btn}
        type="submit"
        onClick={handleSubmit}
        disabled={!question.trim() || isSubmitting} // 유효성 검사 및 제출 중 비활성화
      >
        {isSubmitting ? "전송 중..." : "질문 보내기"}
      </button>
    </div>
  );
};

export default Modal;
