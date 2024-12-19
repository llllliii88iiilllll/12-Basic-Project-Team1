import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../apis/GetUserById";
import { getQuestionsBySubjectId } from "../apis/GetQuestions";
import { getAnswerById } from "../apis/GetAnswerById";
import Header from "../components/Header";
import ButtonFloating from "../public_components/ButtonFloating";
import Modal from "../components/Modal";
import QuestionBox from "../components/QuestionBox";

function FeedPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(2);
  const [nextUrl, setNextUrl] = useState(null); // 다음 페이지 URL 저장
  const observer = useRef(null);
  const nextUrlRef = useRef(nextUrl); // useRef로 nextUrl 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추적
  const [totalCount, setTotalCount] = useState(0); // 총 데이터 개수 추적

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
    try {
      if (isLoading) return; // 로딩 중이면 중복 요청 방지
      setIsLoading(true);

      const questionsResponse = url
        ? await fetch(url).then((res) => res.json()) // 다음 데이터가 있을 경우, nextUrl을 이용하여 데이터 호출
        : await getQuestionsBySubjectId(id); // 첫 호출시 기본 API 호출

      if (!questionsResponse || !questionsResponse.results) {
        console.error("질문 데이터를 불러오는 데 실패했습니다.");
        return;
      }

      console.log("API 응답:", questionsResponse); // 응답 확인
      console.log("count 값:", questionsResponse.count); // count 값 확인

      // 전체 데이터 개수를 추적
      if (questionsResponse.count) {
        setTotalCount(questionsResponse.count);
      }

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

      // 'next' URL을 상태에 저장
      if (questionsResponse.next) {
        console.log("다음 페이지 URL:", questionsResponse.next); // nextUrl 확인
        setNextUrl(questionsResponse.next);
      }
    } catch (error) {
      console.error("데이터 로드 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    console.log(`visibleCount: ${visibleCount}, totalCount: ${totalCount}`);
    if (visibleCount >= totalCount) {
      console.log(
        "모든 데이터가 로드되었으므로 더 이상 불러올 데이터가 없습니다."
      );
    }
  }, [visibleCount, totalCount]); // visibleCount나 totalCount가 변경될 때마다 실행

  const loadMoreData = (entries) => {
    const entry = entries[0];
    console.log("IntersectionObserver entries:", entries); // entries 값 확인
    console.log("nextUrlRef.current:", nextUrlRef.current); // 최신 nextUrl 참조

    if (entry.isIntersecting && nextUrlRef.current && !isLoading) {
      console.log("스크롤 감지됨 - 더 불러오기!");
      fetchData(nextUrlRef.current); // `nextUrlRef.current` 사용
      setVisibleCount((prev) => prev + 1); // 스크롤 시 1개씩 추가
    } else if (!nextUrlRef.current) {
      console.log("nextUrl이 없어서 더 이상 불러올 데이터가 없습니다.");
    }
  };

  useEffect(() => {
    console.log("nextUrl 업데이트:", nextUrl);
    // nextUrl이 업데이트되었을 때, IntersectionObserver가 정상적으로 작동하도록 설정
    if (nextUrl) {
      // 여기에 nextUrl을 사용하여 데이터를 불러오는 로직을 추가
      // 예: IntersectionObserver의 loadMoreData를 호출하는 부분 처리
    }
  }, [nextUrl, isLoading]); // nextUrl이 변경될 때마다 실행

  // 옵저버 초기화
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(loadMoreData, {
      rootMargin: "100px", // 약간 미리 감지하도록 설정
    });

    const target = document.querySelector("#load-more"); // 추가 데이터를 로드할 위치
    if (target) {
      observer.current.observe(target);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

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

  // nextUrl이 변경될 때마다 nextUrlRef를 업데이트
  useEffect(() => {
    nextUrlRef.current = nextUrl;
  }, [nextUrl]);

  useEffect(() => {
    console.log(`visibleCount: ${visibleCount}`);
    console.log(
      "현재 visibleCount에 맞는 질문들:",
      questions.slice(0, visibleCount)
    );
  }, [visibleCount, questions]);

  useEffect(() => {
    console.log("totalCount 업데이트:", totalCount); // totalCount가 변경될 때마다 확인
  }, [totalCount]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <Header userData={userData} />
      <QuestionBox
        userData={userData}
        questions={questions.slice(0, visibleCount)}
      />
      <div id="load-more" style={{ height: "500px" }} /> {/* 로드할 위치 */}
      <ButtonFloating onClick={openModal} />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          userData={userData}
          subjectId={id}
          setQuestions={setQuestions}
        />
      )}
    </>
  );
}

export default FeedPage;
