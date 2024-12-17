import { useEffect, useState } from "react";
import useWindowSize from "../utils/useWindowSize";

export const useLimit = (initialLimit) => {
  const { width } = useWindowSize();
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const newLimit = width >= 868 ? 8 : 6;
    if (newLimit !== limit) {
      setLimit(newLimit);
      localStorage.setItem("limit", newLimit);
    }
  }, [width, limit]);

  return limit;
};
