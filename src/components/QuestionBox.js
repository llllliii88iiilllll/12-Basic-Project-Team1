import React from "react";
import { useState, useEffect } from "react";
import { postReaction } from "../apis/PostReaction";
import { getAnswerById } from "../apis/GetAnswerById.js";
import Counter from "../components/Counter";
import ReactionButtons from "../components/ReactionButton.js";
import { ReactComponent as MessageImg } from "../assets/Icon/messages.svg";
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

const QuestionBox = ({ userData, questions, updateQuestions, totalCount }) => {
  const [activeReactions, setActiveReactions] = useState({});

  const handleReaction = async (questionId, reactionType) => {
    try {
      const updatedQuestion = await postReaction(questionId, reactionType);
      updateQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === updatedQuestion.id
            ? {
                ...question,
                like: updatedQuestion.like,
                dislike: updatedQuestion.dislike,
              }
            : question
        )
      );

      // 활성화된 반응 상태 업데이트
      setActiveReactions((prev) => ({
        ...prev,
        [questionId]: {
          like: reactionType === "like" ? !prev[questionId]?.like : false,
          dislike:
            reactionType === "dislike" ? !prev[questionId]?.dislike : false,
        },
      }));
    } catch (error) {
      console.error("좋아요,싫어요 반영 실패", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.questions_box}>
        <div className={styles.questions_box__title}>
          <MessageImg alt="메세지 이미지" fill="var(--brown-scale-40" />
          <div>
            {questions.length > 0 ? (
              <Counter count={totalCount} />
            ) : (
              "아직 질문이 없습니다"
            )}
          </div>
        </div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              className={`${styles.section} ${styles["question-item"]}`}
              key={question.id}
            >
              {/* badge 부분 */}
              {question.answerContent ? (
                <div className={styles.section_badge__active}>답변 완료</div>
              ) : (
                <div className={styles.section_badge}>미답변</div>
              )}
              {/* question(질문) 부분 */}
              <div className={styles.section_title}>
                <p className={styles.section_title__date}>
                  질문•{getRelativeTime(question.createdAt)}
                </p>
                <p className={styles.section_title__content}>
                  {question.content}
                </p>
              </div>
              {/* answer(답변) 부분 */}
              {question.answerContent && (
                <div className={styles.section_answer}>
                  <img src={userData.imageSource} alt="프로필이미지" />
                  <div>
                    <p className={styles.section_answer__title}>
                      {userData.name}
                      <span>{getRelativeTime(question.answerCreatedAt)}</span>
                    </p>
                    <p className={styles.section_answer__content}>
                      {question.answerContent}
                    </p>
                    {/* isRejected 상태 표시 */}
                    {question.answerIsRejected && (
                      <p className={styles.section_answer__rejected}>
                        답변 거절
                      </p>
                    )}
                  </div>
                </div>
              )}
              <hr className={styles.hr}></hr>
              {/* 좋아요,싫어요 버튼 */}
              <ReactionButtons
                question={question}
                activeReactions={activeReactions}
                onReact={handleReaction}
              />
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
