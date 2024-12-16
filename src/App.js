import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import FeedPage from "./pages/FeedPage";
import ListPage from "./pages/ListPage";

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
        <Route path="/" element={<ListPage />} />
        <Route path="/post/:id" element={<FeedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <BrowserRouter>
<Routes>
  <Route path="/" element />
  <Route path="/list" element={<ListPage />} />
  <Route path="/post">
    <Route index element={<FeedPage />} />
    <Route path=":subjectId" element />
  </Route>
</Routes>
</BrowserRouter> */
}
