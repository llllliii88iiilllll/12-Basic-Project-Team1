import styles from "./ButtonLight.module.css";
import { ReactComponent as IcArrowLineRight } from "../assets/Icon/arrow_line_right.svg";
import { useNavigate } from "react-router-dom";

function ButtonLight({ children }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const id = localStorage.getItem("createdId");

    if (id) {
      navigate(`/post/${id}/answer`);
    } else {
      navigate("/");
    }
  };

  return (
    // <Link to="">
    <button className={styles.button_light} onClick={handleClick}>
      {children}
      <IcArrowLineRight alt="화살표 아이콘" />
    </button>
    // </Link>
  );
}

export default ButtonLight;
