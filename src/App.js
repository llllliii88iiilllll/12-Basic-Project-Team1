import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
