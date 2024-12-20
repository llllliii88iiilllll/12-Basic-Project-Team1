import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
import { getAnswerById } from "../apis/GetAnswerById";
import useScrollToTop from "../hooks/UseScrollToTop";
import ScrollToTopButton from "../public_components/ScrollToTopButton";
import Header from "../components/Header";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import QuestionBox from "../components/QuestionBox";

function FeedPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const nextUrlRef = useRef(nextUrl);
  const [visibleCount, setVisibleCount] = useState(2);
  const [totalCount, setTotalCount] = useState(0);

  const loadMoreRef = useRef(null);

  // fetchAnswers 함수 정의
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
          if (entry.isIntersecting && nextUrlRef.current && !isLoading) {
            fetchData(nextUrlRef.current); // nextUrl을 사용하여 추가 데이터 불러오기
            setVisibleCount((prev) => prev + 1); // visibleCount 증가
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
  }, [isLoading]); // isLoading이 변경될 때마다 실행

  // 데이터 초기 로딩
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userResponse = await getUserById(id);
        if (userResponse) {
          setUserData(userResponse);
        }
        // 처음 데이터 불러오기
        fetchData();
      } catch (error) {
        console.error("초기 데이터 불러오는 데 실패했습니다.", error);
      }
    };

    fetchInitialData();
  }, [id]);

  useEffect(() => {
    nextUrlRef.current = nextUrl;
  }, [nextUrl]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 모달이 열릴 때 스크롤 비활성화
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // 모달이 닫히면 스크롤 활성화
    }

    // Cleanup: 컴포넌트 언마운트 시 overflow 복원
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useScrollToTop(id);

  return (
    <div
      style={{
        overflowY: "auto",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Header userData={userData} />
      <QuestionBox
        userData={userData}
        questions={questions.slice(0, visibleCount)}
        updateQuestions={setQuestions}
      />
      {totalCount > visibleCount && !isLoading && (
        <div
          ref={loadMoreRef}
          style={{ height: "1px", background: "transparent" }}
        ></div>
      )}
      <ButtonFloating onClick={openModal} />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          userData={userData}
          subjectId={id}
          setQuestions={setQuestions}
        />
      )}
      <ScrollToTopButton />
      {isModalOpen && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.56)",
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
          }}
        ></div>
      )}
    </div>
  );
}

export default FeedPage;
