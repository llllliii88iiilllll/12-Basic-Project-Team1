import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getSubjects } from "../apis/GetSubjects";
import { BeatLoader } from "react-spinners";
import styles from "./ListPage.module.css";
import useWindowSize from "../utils/useWindowSize";
import UserCard from "../public_components/UserCard";
import ButtonLightAnswer from "../public_components/ButtonLightAnswer";
import Sort from "../public_components/Sort";
import Pagination from "../public_components/Pagination";
import LogoImage from "../assets/Images/logo.svg";

function ListPage() {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  const [sort, setSort] = useState(localStorage.getItem("sort") || "time");
  const [items, setItems] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(
    parseInt(localStorage.getItem("limit") || 8)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // URL에서 상태 가져오기 (최초 1회)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(params.get("page")) || 1;
    const sortFromUrl = params.get("sort") || "time";

    setCurrentPage(pageFromUrl);
    setSort(sortFromUrl);
    setIsReady(true); // URL 상태 동기화 완료
  }, [location.search]);

  // 화면 크기에 따른 limit 업데이트
  useEffect(() => {
    const newLimit = width >= 868 ? 8 : 6;
    setLimit(newLimit);
  }, [width]);

  // 데이터 fetching
  useEffect(() => {
    if (!isReady) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getSubjects({
          offset: (currentPage - 1) * limit,
          sort,
          limit,
        });
        if (response && response.results) {
          const sortedResults = [...response.results].sort((a, b) =>
            sort === "time"
              ? b.time - a.time
              : a.name.localeCompare(b.name, "ko")
          );
          setItems({ results: sortedResults });
          setTotalPages(Math.ceil(response.count / limit));
        } else {
          setItems({ results: [] });
          setTotalPages(1);
        }
      } catch (error) {
        console.error("데이터를 불러오는데 실패하였습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, limit, sort, isReady]);

  // 페이지 변경 시 URL 업데이트
  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(location.search);
    params.set("page", pageNumber);
    params.set("sort", sort); // 현재 sort 값을 URL에 반영
    navigate(`?${params.toString()}`); // URL 갱신
    setCurrentPage(pageNumber); // 상태 업데이트
  };

  // 정렬 변경 시 URL 업데이트
  const handleSortChange = (newSort) => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage); // 현재 페이지는 유지
    params.set("sort", newSort); // 새로운 정렬 기준을 URL에 반영
    navigate(`?${params.toString()}`); // URL 갱신
    setSort(newSort); // 상태 업데이트
  };

  // currentPage가 totalPages보다 클 경우, currentPage를 totalPages로 설정
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      // page 파라미터가 없을 경우는 page=0이 되어 음수 페이지네이션이 나옴, 그래서 > 0 조건을 달아주어야 함
      setCurrentPage(totalPages);
      const params = new URLSearchParams(location.search);
      params.set("page", totalPages);
      navigate(`?${params.toString()}`);
    }
  }, [totalPages, currentPage]);

  return (
    <div className={styles.list_wrap}>
      <nav className={styles.list_top}>
        <Link to="/">
          <img src={LogoImage} alt="로고 이미지" className={styles.list_logo} />
        </Link>
        <ButtonLightAnswer>답변하러 가기</ButtonLightAnswer>
      </nav>
      <section className={styles.list_body}>
        <div className={styles.list_body_top}>
          <h1>누구에게 질문할까요?</h1>
          <Sort setSort={handleSortChange} currentSort={sort} />
        </div>
        {loading ? (
          <div className={styles.loading}>
            <BeatLoader color="#542F1A" />
            <p>데이터를 불러오고 있습니다.</p>
          </div>
        ) : (
          <>
            <UserCard items={items.results} />
            <Pagination
              setCurrentPage={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </section>
    </div>
  );
}

export default ListPage;
