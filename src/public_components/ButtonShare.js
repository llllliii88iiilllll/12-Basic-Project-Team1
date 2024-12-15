import { useState } from "react";
import styles from "./ButtonShare.module.css";
import { ReactComponent as IcLink } from "../assets/Icon/link.svg";
import { ReactComponent as IcKakaotalk } from "../assets/Icon/kakaotalk.svg";
import { ReactComponent as IcFacebook } from "../assets/Icon/facebook.svg";

function ButtonShare() {
  const [toastVisible, setToastVisible] = useState(false);

  // URL 클립보드에 복사 핸들러
  const handleLinkClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
      })
      .catch(() => {
        console.error("URL 복사에 실패했습니다.");
      });
  };

  // 카카오톡 공유 핸들러
  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "오픈마인드 개별피드",
          description: "이 질문에 답변해주세요!",
          imageUrl: "../assets/Images/key_visual.png",
          link: {
            mobileWebUrl: "https://example.com",
            webUrl: "https://example.com",
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: "https://example.com",
              webUrl: "https://example.com",
            },
          },
        ],
      });
    } else {
      console.error("카카오톡 SDK가 초기화되지 않았습니다.");
    }
  };

  // 페이스북 공유 핸들러
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  return (
    <>
      <ul className={styles.button_share}>
        <li onClick={handleLinkClick}>
          <IcLink />
        </li>
        <li onClick={handleKakaoShare}>
          <IcKakaotalk />
        </li>
        <li onClick={handleFacebookShare}>
          <IcFacebook />
        </li>
      </ul>
      {toastVisible && (
        <div className={styles.toast}>URL이 복사되었습니다.</div>
      )}
    </>
  );
}

export default ButtonShare;
