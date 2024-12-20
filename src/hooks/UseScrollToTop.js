import { useEffect } from "react";

const useScrollToTop = (dependency) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dependency]);
};

export default useScrollToTop;
