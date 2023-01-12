import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import ShowDetailPage from "./Pages/ShowDetails.Page";
import ShowListPage from "./Pages/ShowsList.Page";

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<ShowListPage />} />
          <Route path="show/:show_id" element={<ShowDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
