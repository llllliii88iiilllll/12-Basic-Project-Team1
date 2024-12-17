import React from "react";
import MessageImg from "../assets/Icon/messages.svg";
import ThumbsUpImg from "../assets/Icon/thumbs-up.svg";
import ThumbsDownImg from "../assets/Icon/thumbs-down.svg";
import EmptyImg from "../assets/Images/empty.png";
import styles from "./QuestionBox.module.css";

// 시간 계산 함수
const getRelativeTime = (dateString) => {
  const now = new Date();
  const targetDate = new Date(dateString);
  const diff = now - targetDate; // 차이를 밀리초로 계산

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
};

const QuestionBox = ({ userData, questions }) => {
  return (
    <div className={styles.container}>
      <div className={styles.questions_box}>
        <div className={styles.questions_box__title}>
          <img src={MessageImg} alt="메세지 이미지" />
          <p>
            {userData.questionCount > 0
              ? `${userData.questionCount}개의 질문이 있습니다.`
              : "아직 질문이 없습니다"}
          </p>
        </div>
        {userData.questionCount > 0 ? (
          questions.map((question) => (
            <div className={styles.section} key={question.id}>
              <div className={styles.section_badge}>미답변</div>
              <div className={styles.section_title}>
                <p className={styles.section_title__date}>
                  질문•{getRelativeTime(question.createdAt)}
                </p>
                <p className={styles.section_title__content}>
                  {question.content}
                </p>
              </div>
              <div className={styles.section_reactions}>
                <div>
                  <button>
                    <img src={ThumbsUpImg} alt="좋아요 아이콘" />
                  </button>
                  좋아요 {question.like > 999 ? "+999" : question.like}
                </div>
                <div>
                  <button>
                    <img src={ThumbsDownImg} alt="싫어요 아이콘" />
                  </button>
                  싫어요 {question.like > 999 ? "+999" : question.like}
                </div>
              </div>
            </div>
          ))
        ) : (
          <img className={styles.empty_img} src={EmptyImg} alt="빈페이지" />
        )}
      </div>
    </div>
  );
};

export default QuestionBox;
