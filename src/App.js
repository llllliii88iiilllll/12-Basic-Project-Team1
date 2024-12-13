import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import FeedPage from "./pages/FeedPage";

function App() {
  // 카카오톡 SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("f81625fa5ab01cab739954482fe39cd7");
      console.log("Kakao SDK Initialized");
    }
  }, []);

  return (
    <BrowserRouter>
      <FeedPage />
    </BrowserRouter>
  );
}

export default App;
