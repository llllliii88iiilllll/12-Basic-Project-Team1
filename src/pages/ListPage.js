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
  const [sort, setSort] = useState(localStorage.getItem("sort") || "time");
  const [items, setItems] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(
    parseInt(localStorage.getItem("limit") || 8)
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage") || 1)
  );
  const [totalPages, setTotalPages] = useState(0);
  const { width } = useWindowSize();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLoad = async () => {
    setLoading(true);
    try {
      const response = await getSubjects({
        offset: (currentPage - 1) * limit,
        sort,
        limit,
      });
      if (response && response.results) {
        const sortedResults = [...response.results].sort((a, b) =>
          sort === "time" ? b.time - a.time : a.name.localeCompare(b.name, "ko")
        );
        setItems({ results: sortedResults });
        setTotalPages(Math.ceil(response.count / limit));
      } else {
        setItems({ results: [] });
      }
    } catch (error) {
      console.error("데이터를 불러오는데 실패하였습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  // 화면 크기에 따른 limit 업데이트
  useEffect(() => {
    const newLimit = width >= 868 ? 8 : 6;
    if (newLimit !== limit) {
      setLimit(newLimit);
      localStorage.setItem("limit", newLimit);
    }
  }, [width, limit]);

  // URL에서 페이지와 정렬 값 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(params.get("page")) || 1;
    const sortFromUrl = params.get("sort") || "time";

    setSort(sortFromUrl);
    setCurrentPage(pageFromUrl);

    // localStorage에 상태를 저장하기
    localStorage.setItem("currentPage", pageFromUrl);
    localStorage.setItem("sort", sortFromUrl);
  }, [location.search]);

  useEffect(() => {
    handleLoad();
  }, [sort, currentPage, limit]);

  // 페이지 변경 시 URL 업데이트
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호 상태 즉시 업데이트
  };

  // 정렬 변경 시 URL 업데이트
  const handleSortChange = (newSort) => {
    setSort(newSort); // 정렬 상태 즉시 업데이트
    setCurrentPage(currentPage);
  };

  // currentPage 변경시 navigate 호출
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    params.set("sort", sort);
    navigate(`?${params.toString()}`);
    handleLoad(); // navigate 후 데이터 로드
  }, [currentPage, sort, navigate]);

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
              handleLoad={handleLoad}
              limit={limit}
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
