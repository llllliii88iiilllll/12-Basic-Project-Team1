import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [sort, setSort] = useState(localStorage.getItem("sort") || "time");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(params.get("page")) || 1;
    const sortFromUrl = params.get("sort") || "time";

    // currentPage와 sort가 URL에서 읽어온 값과 다를 경우에만 상태 업데이트
    if (currentPage !== pageFromUrl) {
      setCurrentPage(pageFromUrl);
    }
    if (sort !== sortFromUrl) {
      setSort(sortFromUrl);
    }
    localStorage.setItem("currentPage", pageFromUrl);
    localStorage.setItem("sort", sortFromUrl);
  }, [location.search, currentPage, sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    params.set("sort", sort);
    if (location.search !== `?${params.toString()}`) {
      navigate(`?${params.toString()}`);
    }
  }, [currentPage, sort, navigate, location.search]);

  return { currentPage, setCurrentPage, sort, setSort };
};
