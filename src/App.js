import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import FeedPage from "./pages/FeedPage";
import ListPage from "./pages/ListPage";
import AnswerPage from "./pages/AnswerPage";
import NotFoundPage from "./pages/NotFoundPage";

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
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/post/:id">
          <Route index element={<FeedPage />} />
          <Route path=":subjectId" element={<AnswerPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
