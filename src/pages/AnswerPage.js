import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
import { getAnswerById } from "../apis/GetAnswerById";
import { deleteQuestion } from "../apis/DeleteQuestion";
import { postAnswer } from "../apis/PostAnswer";
import { deleteSubject } from "../apis/DeleteSubject";
import styles from "./AnswerPage.module.css";
import useScrollToTop from "../hooks/UseScrollToTop";
import ScrollToTopButton from "../public_components/ScrollToTopButton";
import Header from "../components/Header";
import QuestionBox from "../components/QuestionBox";
import ButtonDelete from "../components/ButtonDelete";

function AnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [totalCount, setTotalCount] = useState(0);
  const loadMoreRef = useRef(null);

  const handleDeleteAll = async () => {
    try {
      // 1. 모든 질문 삭제 요청
      for (const question of questions) {
        await deleteQuestion(question.id);
      }
      // 2. 질문 대상(=피드) 삭제 요청
      await deleteSubject(id);

      // 삭제 후 상태 업데이트
      setQuestions([]);
      alert("모든 질문과 질문 대상이 삭제되었습니다.");
      navigate("/list");
    } catch (error) {
      console.error("삭제 작업 실패:", error);
    }
  };

  // 답변 폼 제출 함수
  const submitAnswer = async (questionId, answerContent) => {
    try {
      const response = await postAnswer(questionId, answerContent);
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId
            ? { ...question, answerContent, answerId: response.id } // 새로 작성된 답변 업데이트
            : question
        )
      );
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
  };

  // fetchAnswers 함수 정의 (기존 답변 불러오기)
  const fetchAnswers = async (questions) => {
    const updatedQuestions = await Promise.all(
      questions.map(async (question) => {
        if (question.answer) {
          try {
            const answerResponse = await getAnswerById(question.answer.id);
            return {
              ...question,
              answerContent: answerResponse.content,
              answerCreatedAt: answerResponse.createdAt,
              answerIsRejected: answerResponse.isRejected,
            };
          } catch (error) {
            console.error(
              `Answer ID ${question.answer.id} 데이터를 불러오지 못했습니다.`,
              error
            );
          }
        }
        return question;
      })
    );
    return updatedQuestions;
  };

  const fetchData = async (url = null) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const questionsResponse = url
        ? await fetch(url).then((res) => res.json())
        : await getQuestionsBySubjectId(id);

      if (!questionsResponse || !questionsResponse.results) {
        console.error("질문 데이터를 불러오는 데 실패했습니다.");
        return;
      }

      setTotalCount(questionsResponse.count);

      const questionsWithDefaults = questionsResponse.results.map(
        (question) => ({
          ...question,
          like: question.like ?? 0,
          dislike: question.dislike ?? 0,
        })
      );

      const questionsWithAnswers = await fetchAnswers(questionsWithDefaults);

      setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...questionsWithAnswers,
      ]);

      if (questionsResponse.next) {
        setNextUrl(questionsResponse.next);
      } else {
        setVisibleCount(questionsResponse.count);
      }
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // IntersectionObserver로 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            if (nextUrl) {
              // nextUrl이 있으면 데이터를 추가로 불러옴
              fetchData(nextUrl);
              setVisibleCount((prev) => prev + 1);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px 180px 0px", // 하단에 여유를 두어 미리 데이터를 불러오게 함
        threshold: 0.8, // 80%가 보일 때 트리거
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current); // loadMoreRef를 관찰 대상으로 설정
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current); // 언마운트 시 옵저버 해제
      }
    };
  }, [isLoading, questions.length, nextUrl]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await getUserById(id);
        if (userResponse) {
          setUserData(userResponse);
        }
        fetchData(); // 처음 데이터 불러오기
      } catch (error) {
        console.error("초기 데이터 불러오는 데 실패했습니다.", error);
      }
    };

    fetchInitialData();
  }, [id]);

  useScrollToTop(id);

  return (
    <div className={styles.wrap}>
      <Header userData={userData} />
      <QuestionBox
        userData={userData}
        questions={questions}
        updateQuestions={setQuestions}
        totalCount={totalCount}
        submitAnswer={submitAnswer} // 답변 제출 함수 전달
        handleDeleteAll={handleDeleteAll}
      />
      {totalCount > visibleCount && !isLoading && (
        <div ref={loadMoreRef} className={styles.observe_div}></div>
      )}

      <ScrollToTopButton className={styles.button_scroll_top} />
    </div>
  );
}

export default AnswerPage;
