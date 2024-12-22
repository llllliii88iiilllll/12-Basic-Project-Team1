import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { updateAnswer } from "../apis/UpdateAnswer.js";
import { postAnswer } from "../apis/PostAnswer";
import { postReaction } from "../apis/PostReaction";
import { deleteAnswer } from "../apis/DeleteAnswer.js";
import Counter from "../components/Counter";
import ReactionButtons from "../components/ReactionButton.js";
import { ReactComponent as MessageImg } from "../assets/Icon/messages.svg";
import EmptyImg from "../assets/Images/empty.png";
import styles from "./QuestionBox.module.css";
import { ReactComponent as MoreIcon } from "../assets/Icon/more.svg";
import { ReactComponent as EditIcon } from "../assets/Icon/edit.svg";
import { ReactComponent as DeleteIcon } from "../assets/Icon/close.svg";
import ButtonDelete from "./ButtonDelete.js";

// 시간 계산 함수
const getRelativeTime = (dateString) => {
  const now = new Date();
  const targetDate = new Date(dateString);
  // UTC 시간 차이 보정
  const diff = now.getTime() - targetDate.getTime(); // 밀리초 단위 차이 계산

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (seconds < 0) return `방금 전`; // 음수일 경우 처리
  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return `${weeks}주 전`;
};

const QuestionBox = ({
  userData,
  questions,
  updateQuestions,
  totalCount,
  handleDeleteAll,
}) => {
  const [activeReactions, setActiveReactions] = useState({});
  const location = useLocation(); // 현재 경로 가져오기
  const [isAnswerPage, setIsAnswerPage] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const menuRef = useRef(null);

  useEffect(() => {
    // '/answer' 경로가 포함된 경우에만 답변 폼을 보여줌
    setIsAnswerPage(location.pathname.includes("/answer"));

    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 임의 대기
      setIsLoading(false);
    };
    fetchData();
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

  const isAnswerChanged = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const currentAnswer = answerData[questionId]?.content || "";
    return currentAnswer.trim() !== question?.answerContent?.trim();
  };

  const submitAnswer = async (questionId) => {
    const { content, isRejected } = answerData[questionId] || {
      content: "",
      isRejected: false,
    };

    if (content.trim() === "") {
      alert("답변을 입력해주세요.");
      return;
    }

    const finalIsRejected = isRejected === true;

    try {
      const question = questions.find((q) => q.id === questionId);
      const answerId = question?.answer?.id; // 기존 답변 ID 확인
      const tempTime = new Date(); // 답변 제출 시점 기록

      if (answerId) {
        // 기존 답변 수정 (PUT 요청)
        const response = await updateAnswer(answerId, content, finalIsRejected);

        updateQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  answerContent: content,
                  isRejected: finalIsRejected,
                  answerIsRejected: finalIsRejected,
                  answerCreatedAt: response.createdAt || tempTime.toISOString(),
                }
              : q
          )
        );
      } else {
        // 새 답변 추가 (POST 요청)
        const response = await postAnswer(questionId, content, finalIsRejected);

        if (response && response.id) {
          // POST 성공 후 상태 업데이트
          await new Promise((resolve) => {
            updateQuestions((prevQuestions) => {
              const updatedQuestions = prevQuestions.map((q) =>
                q.id === questionId
                  ? {
                      ...q,
                      answerContent: content,
                      isRejected: finalIsRejected,
                      answerIsRejected: finalIsRejected,
                      answer: { id: response.id }, // 새로 생성된 답변 ID 반영
                      answerCreatedAt:
                        response.createdAt || tempTime.toISOString(),
                    }
                  : q
              );
              resolve(updatedQuestions); // 상태 업데이트 완료 보장
              return updatedQuestions;
            });
          });
          console.log("새 상태가 업데이트되었습니다.");
        } else {
          throw new Error("POST 응답에서 ID를 받지 못했습니다.");
        }
      }

      // 수정 모드 종료 및 입력 필드 초기화
      setAnswerData((prevData) => ({
        ...prevData,
        [questionId]: { content: "", isRejected: false },
      }));
      setEditingQuestionId(null);
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
  };

  // 수정 버튼 클릭 시 처리
  const handleUpdateAnswer = (questionId) => {
    setEditingQuestionId(questionId); // 수정 중인 질문 ID 설정
    const currentAnswer =
      questions.find((q) => q.id === questionId)?.answerContent || "";
    const currentRejected =
      questions.find((q) => q.id === questionId)?.answerIsRejected || false;

    setAnswerData((prevData) => ({
      ...prevData,
      [questionId]: {
        content: currentAnswer,
        isRejected: currentRejected,
      },
    }));

    setActiveQuestionId(null);
  };

  // 답변 삭제 처리
  const handleDeleteAnswer = async (questionId) => {
    try {
      const question = questions.find((q) => q.id === questionId);

      if (!question?.answer?.id) {
        alert("삭제할 답변이 없습니다.");
        return;
      }

      // deleteAnswer 함수로 삭제 요청
      await deleteAnswer(question.answer.id); // 서버에서 답변 삭제 요청

      updateQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId
            ? { ...q, answerContent: "", answerIsRejected: false, answer: null }
            : q
        )
      );

      setAnswerData((prevData) => ({
        ...prevData,
        [questionId]: { content: "", isRejected: false },
      }));

      setEditingQuestionId(null);
    } catch (error) {
      console.error("답변 삭제 실패:", error);
      alert("답변 삭제에 실패했습니다. 다시 시도해주세요.");
    }
    setActiveQuestionId(null);
  };

  // 외부 클릭 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveQuestionId(null); // 메뉴 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      {isAnswerPage && (
        <div className={styles.button_wrap}>
          <ButtonDelete handleDeleteAll={handleDeleteAll} />
        </div>
      )}
      <div className={styles.questions_box}>
        <div className={styles.questions_box__title}>
          <MessageImg alt="메세지 이미지" fill="var(--brown-scale-40" />
          <div>
            {isLoading ? (
              "불러오고 있습니다..."
            ) : questions.length === 0 ? (
              "아직 질문이 없습니다"
            ) : (
              <Counter count={totalCount} />
            )}
          </div>
        </div>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              className={`${styles.section} ${styles["question-item"]}`}
              key={`${question.id}-${question.answerIsRejected}`}
            >
              <div className={styles.section_top_wrap}>
                {question.answerContent ? (
                  <div className={styles.section_badge__active}>답변 완료</div>
                ) : (
                  <div className={styles.section_badge}>미답변</div>
                )}
                {isAnswerPage && (
                  <div className={styles.kebabMenu}>
                    <MoreIcon
                      onClick={() => setActiveQuestionId(question.id)}
                      className={`${styles.kebabIcon} ${
                        !question.answerContent ? styles.disabled : ""
                      }`}
                      style={{
                        pointerEvents: !question.answerContent
                          ? "none"
                          : "auto",
                        opacity: !question.answerContent ? 0.5 : 1,
                      }}
                    />
                    {activeQuestionId === question.id && (
                      <div className={styles.menu} ref={menuRef}>
                        <button onClick={() => handleUpdateAnswer(question.id)}>
                          <EditIcon alt="수정 아이콘" />
                          수정하기
                        </button>
                        <button onClick={() => handleDeleteAnswer(question.id)}>
                          <DeleteIcon alt="삭제 아이콘" />
                          삭제하기
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* question(질문) 부분 */}
              <div className={styles.section_title}>
                <p className={styles.section_title__date}>
                  질문•{getRelativeTime(question.createdAt)}
                </p>
                <p className={styles.section_title__content}>
                  {question.content}
                </p>
              </div>
              {/* 답변 내용 표시 */}
              {editingQuestionId === question.id ? (
                <div className={styles.section_answer}>
                  <img src={userData.imageSource} alt="프로필 이미지" />
                  <div className={styles.answer_textarea_wrap}>
                    <p className={styles.section_answer__title}>
                      {userData.name}
                      <span>{getRelativeTime(question.answerCreatedAt)}</span>
                    </p>
                    <textarea
                      value={answerData[question.id]?.content || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      placeholder="답변을 입력하세요"
                      disabled={answerData[question.id]?.isRejected || false}
                      className={styles.answer_textarea}
                    />
                    <div>
                      <label className={styles.reject_checkbox}>
                        <input
                          type="checkbox"
                          checked={answerData[question.id]?.isRejected || false}
                          onChange={() => handleRejectedChange(question.id)}
                        />
                        답변 거절
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        submitAnswer(question.id);
                      }}
                      disabled={!isAnswerChanged(question.id)}
                      className={styles.button_submit_edit}
                    >
                      수정 완료
                    </button>
                  </div>
                </div>
              ) : (
                // 기존 답변 표시
                question.answerContent && (
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
                      {question.answerIsRejected && (
                        <p className={styles.section_answer__rejected}>
                          답변 거절
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* 답변 폼: 현재 경로가 /answers/일 때만 보여짐 */}
              {isAnswerPage && !question.answerContent && (
                <div className={styles.section_answer}>
                  <img src={userData.imageSource} alt="프로필이미지" />
                  <div className={styles.answer_form}>
                    <p className={styles.section_answer__title}>
                      {userData.name}
                    </p>
                    <textarea
                      value={answerData[question.id]?.content || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      placeholder="답변을 입력하세요"
                      disabled={answerData[question.id]?.isRejected || false}
                      className={styles.answer_textarea}
                    />
                    <div>
                      <label className={styles.reject_checkbox}>
                        <input
                          type="checkbox"
                          checked={answerData[question.id]?.isRejected || false}
                          onChange={() => handleRejectedChange(question.id)}
                        />
                        답변 거절
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        submitAnswer(question.id);
                      }}
                      disabled={
                        !answerData[question.id]?.content ||
                        answerData[question.id]?.content.trim() === ""
                      }
                      className={styles.button_submit}
                    >
                      답변 제출
                    </button>
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
