import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubjects } from "../apis/GetSubjects";
import UserCard from "../public_components/UserCard";
import pagestyles from "./ListPage.module.css";
import ButtonLightAnswer from "../public_components/ButtonLightAnswer";
import Sort from "../public_components/Sort";
import LogoImage from "../assets/Images/logo.svg";
import useWindowSize from "../utils/useWindowSize";
import Pagination from "../public_components/Pagination";

function ListPage() {
  const [order, setOrder] = useState("createdAt");

  const [items, setItems] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const { width } = useWindowSize();

  const sortedItems = [...items.results].sort((a, b) => {
    if (order === "createdAt") {
      return b[order] - a[order];
    } else if (order === "name") {
      return a.name.localeCompare(b.name, "ko");
    }
  });

  const handleLoad = async (options) => {
    setLoading(true);
    try {
      const response = await getSubjects({ ...options, order, limit });
      if (response && response.results) {
        setItems({ results: response.results });
        setCount(response.count);
        setTotalPages(Math.ceil(response.count / limit));
      } else {
        setItems({ results: [] });
      }
    } catch (error) {
      console.error("Failed to load items:", error);
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
  }, [order, currentPage, limit]);

  return (
    <div className={pagestyles.list_wrap}>
      <nav className={pagestyles.list_top}>
        <Link to="/">
          <img
            src={LogoImage}
            alt="로고 이미지"
            className={pagestyles.list_logo}
          />
        </Link>
        <ButtonLightAnswer>답변하러 가기</ButtonLightAnswer>
      </nav>
      <section className={pagestyles.list_body}>
        <div className={pagestyles.list_body_top}>
          <h1>누구에게 질문할까요?</h1>
          <Sort setOrder={setOrder} />
        </div>
        {loading ? (
          <p>loading...</p>
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
