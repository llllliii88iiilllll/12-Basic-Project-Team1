import styles from "./Pagination.module.css";
import { ReactComponent as IcArrowRight } from "../assets/Icon/arrow_right.svg";
import { ReactComponent as IcArrowLeft } from "../assets/Icon/arrow_left.svg";

function Pagination({ setCurrentPage, currentPage, totalPages }) {
  const btnRange = 5;

  const currentSet = Math.ceil(currentPage / btnRange);
  const startPage = (currentSet - 1) * btnRange + 1;
  const endPage = Math.min(totalPages, currentSet * btnRange);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousSet = () => {
    if (startPage > 1) {
      const newStartPage = Math.max(1, startPage - btnRange);
      const newEndPage = newStartPage + btnRange - 1;
      setCurrentPage(newEndPage);
    }
  };

  const goToNextSet = () => {
    if (endPage < totalPages) {
      const newStartPage = endPage + 1;
      setCurrentPage(newStartPage);
    }
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

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
        const pageNumber = startPage + idx;
        return (
          pageNumber <= totalPages && (
            <li
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={currentPage === pageNumber ? styles.active : ""}
            >
              {pageNumber}
            </li>
          )
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
