import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [sort, setSort] = useState("time");

  const [items, setItems] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { width } = useWindowSize();

  const sortedItems = [...items.results].sort((a, b) => {
    if (sort === "time") {
      return b[sort] - a[sort];
    } else if (sort === "name") {
      return a.name.localeCompare(b.name, "ko");
    }
  });

  const handleLoad = async (options) => {
    setLoading(true);
    try {
      const response = await getSubjects({ ...options, sort, limit });
      if (response && response.results) {
        setItems({ results: response.results });
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

  useEffect(() => {
    if (width >= 868) {
      setLimit(8);
    } else {
      setLimit(6);
    }
  }, [width]);

  useEffect(() => {
    handleLoad({ offset: (currentPage - 1) * limit });
  }, [sort, currentPage, limit]);

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
          <Sort setSort={setSort} />
        </div>
        {loading ? (
          <div className={styles.loading}>
            <BeatLoader color="#542F1A" />
            <p>데이터를 불러오고 있습니다.</p>
          </div>
        ) : (
          <>
            <UserCard items={sortedItems} />
            <Pagination
              setCurrentPage={setCurrentPage}
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
