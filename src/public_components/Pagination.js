import styles from "./Pagination.module.css";
import { ReactComponent as IcArrowRight } from "../assets/Icon/arrow_right.svg";
import { ReactComponent as IcArrowLeft } from "../assets/Icon/arrow_left.svg";

function Pagination({
  setCurrentPage,
  handleLoad,
  limit,
  currentPage,
  totalPages,
}) {
  const btnRange = 5;
  const currentSet = Math.ceil(totalPages / btnRange);
  const startPage = (currentSet - 1) * btnRange + 1;
  const endPage = Math.min(totalPages, startPage + btnRange - 1);

  const goToPreviousSet = () => {
    if (startPage > 1) {
      const newStartPage = Math.max(1, startPage - btnRange);
      const newEndPage = newStartPage + btnRange - 1;
      setCurrentPage(newEndPage);
      const offset = (newEndPage - 1) * limit;
      handleLoad({ offset, limit: limit });
    }
  };

  const goToNextSet = () => {
    if (endPage < totalPages) {
      const newStartPage = endPage + 1;
      setCurrentPage(newStartPage);
      const offset = (newStartPage - 1) * limit;
      handleLoad({ offset, limit: limit });
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    const offset = (pageNumber - 1) * limit;
    handleLoad({ offset, limit: limit });
  };

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.prev_button} ${
          startPage === 1 ? styles.disabled : ""
        }`}
        onClick={goToPreviousSet}
      >
        <IcArrowLeft />
      </li>

      {Array.from({ length: totalPages }, (_, idx) => {
        const pageNumber = idx + 1;
        return (
          <li
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={currentPage === pageNumber ? styles.active : ""}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={`${styles.next_button} ${
          endPage >= totalPages ? styles.disabled : ""
        }`}
        onClick={goToNextSet}
      >
        <IcArrowRight />
      </li>
    </ul>
  );
}

export default Pagination;
