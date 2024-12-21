import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { postAnswer } from "../apis/PostAnswer";
import { postReaction } from "../apis/PostReaction";
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
  const { id } = useParams(); // URL에서 questionId 가져오기
  const [answerContent, setAnswerContent] = useState("");
  const [activeReactions, setActiveReactions] = useState({});
  const [isRejected, setIsRejected] = useState(false);

  const location = useLocation(); // 현재 경로 가져오기
  const [isAnswerPage, setIsAnswerPage] = useState(false);

  useEffect(() => {
    // '/answer' 경로가 포함된 경우에만 답변 폼을 보여줌
    setIsAnswerPage(location.pathname.includes("/answer"));
  }, [location]);

  // 각 질문에 대한 답변 내용과 거절 여부 상태 초기화
  const [answerData, setAnswerData] = useState(() =>
    questions.reduce((acc, question) => {
      acc[question.id] = { content: "", isRejected: false }; // 각 질문에 대해 기본값 설정
      return acc;
    }, {})
  );

  // 답변 내용 변경
  const handleAnswerChange = (questionId, value) => {
    console.log(`Answer change for question ${questionId}:`, value); // 디버깅
    setAnswerData((prevData) => ({
      ...prevData,
      [questionId]: { ...prevData[questionId], content: value },
    }));
  };

  // 답변 거절 상태 변경
  const handleRejectedChange = (questionId) => {
    const currentIsRejected = answerData[questionId]?.isRejected || false; // 기본값 false
    setAnswerData((prevData) => ({
      ...prevData,
      [questionId]: {
        ...prevData[questionId],
        isRejected: !currentIsRejected, // 상태 변경
        content: !currentIsRejected ? "답변 거절" : "", // 거절 시 자동으로 답변 거절로 설정
      },
    }));
  };

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

  const submitAnswer = async (questionId) => {
    try {
      const { content, isRejected } = answerData[questionId] || {
        content: "답변 거절",
        isRejected: false,
      }; // 기본값 설정
      const response = await postAnswer(questionId, content, isRejected);
      updateQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                answerContent: content,
                isRejected,
                answerIsRejected: isRejected,
              }
            : question
        )
      );
      setAnswerData((prevData) => ({
        ...prevData,
        [questionId]: { content: "", isRejected: false },
      })); // 폼 초기화
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
  };

  useEffect(() => {
    // answerIsRejected 상태 변경시 UI 갱신
    updateQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, answerIsRejected: answerData[id]?.isRejected }
          : question
      )
    );
  }, [answerData]);

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
              key={`${question.id}-${question.answerIsRejected}`}
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
                    {!question.answerIsRejected && (
                      <p className={styles.section_answer__content}>
                        {question.answerContent}
                      </p>
                    )}
                    {/* isRejected 상태 표시 */}
                    {question.answerIsRejected && (
                      <p className={styles.section_answer__rejected}>
                        답변 거절
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* 답변 폼: 현재 경로가 /answers/일 때만 보여짐 */}
              {isAnswerPage && !question.answerContent && (
                <div className={styles.answer_form}>
                  <textarea
                    value={answerData[question.id]?.content || ""}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    placeholder="답변을 입력하세요"
                    disabled={answerData[question.id]?.isRejected || false}
                  />
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={answerData[question.id]?.isRejected || false}
                        onChange={() => handleRejectedChange(question.id)} // 거절 상태 토글
                      />
                      답변 거절 여부
                    </label>
                  </div>
                  <button
                    onClick={() => {
                      console.log(`Submit clicked for question ${question.id}`); // 디버깅
                      submitAnswer(question.id);
                    }}
                  >
                    답변 제출
                  </button>
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
