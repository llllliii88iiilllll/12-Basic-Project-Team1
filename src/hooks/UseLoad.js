import { useState, useEffect } from "react";
import { getSubjects } from "../apis/GetSubjects";

export const useLoad = (currentPage, limit, sort) => {
  const [items, setItems] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

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
        const newTotalPages = Math.ceil(response.count / limit);
        setTotalPages(newTotalPages);
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

  useEffect(() => {
    handleLoad();
  }, [currentPage, limit, sort]);

  return { items, loading, totalPages };
};
