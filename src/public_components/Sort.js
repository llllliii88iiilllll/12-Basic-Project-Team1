import styles from "./Sort.module.css";
import { useRef, useState, useEffect } from "react";
import { ReactComponent as IcDown } from "../assets/Icon/arrow_down.svg";
import { ReactComponent as IcUp } from "../assets/Icon/arrow_up.svg";

function Sort({ setSort }) {
  const selectRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("최신순");
  const [showOptions, setShowOptions] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isIcDownVisible, setIsIcDownVisible] = useState(true);

  const handleClickSelectValue = (e) => {
    const sortValue = e.target.getAttribute("value");
    const sortName = e.target.getAttribute("name");
    setCurrentValue(sortName);
    setSort(sortValue);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleLabelClick = () => {
    setIsActive(!isActive);
    setIsIcDownVisible((prevState) => !prevState);
    setShowOptions(!showOptions);
  };

  return (
    <div
      className={styles.sort_wrap}
      onClick={handleLabelClick}
      ref={selectRef}
    >
      <label
        className={isActive ? styles.sort_label_active : styles.sort_label}
      >
        {currentValue}
        {isIcDownVisible ? (
          <IcDown className={styles.sort_default} />
        ) : (
          <IcUp className={styles.sort_active} />
        )}
      </label>
      {showOptions && (
        <ul>
          <li value="time" name="최신순" onClick={handleClickSelectValue}>
            최신순
          </li>
          <li value="name" name="이름순" onClick={handleClickSelectValue}>
            이름순
          </li>
        </ul>
      )}
    </div>
  );
}

export default Sort;
