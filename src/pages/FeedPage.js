import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
import { getAnswerById } from "../apis/GetAnswerById";
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

  const [visibleCount, setVisibleCount] = useState(2); // 초기 visibleCount는 2개
  const [nextUrl, setNextUrl] = useState(null); // 다음 페이지 URL
  const nextUrlRef = useRef(nextUrl); // nextUrl을 관리하기 위한 useRef
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추적
  const [totalCount, setTotalCount] = useState(0); // 총 데이터 개수 추적

  const loadMoreRef = useRef(null); // IntersectionObserver의 대상이 될 ref

  // 새로고침 시 최상단으로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 최상단으로 이동
  }, [id]); // id가 변경될 때마다 실행

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
    if (isLoading) return; // 로딩 중이면 중복 요청 방지
    setIsLoading(true);

    try {
      const questionsResponse = url
        ? await fetch(url).then((res) => res.json()) // nextUrl을 사용하여 다음 데이터를 호출
        : await getQuestionsBySubjectId(id); // 첫 번째 호출 시 기본 API 호출

      if (!questionsResponse || !questionsResponse.results) {
        console.error("질문 데이터를 불러오는 데 실패했습니다.");
        return;
      }

      setTotalCount(questionsResponse.count); // 전체 데이터 개수 추적

      // like와 dislike의 초기값을 설정
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
        setNextUrl(questionsResponse.next); // 다음 페이지 URL을 설정
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
          setUserData(userResponse); // 사용자 데이터 갱신
        }

        // 처음 데이터 불러오기
        fetchData();
      } catch (error) {
        console.error("초기 데이터 불러오는 데 실패했습니다.", error);
      }
    };

    fetchInitialData();
  }, [id]);

  // nextUrl이 변경될 때마다 nextUrlRef를 업데이트
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
