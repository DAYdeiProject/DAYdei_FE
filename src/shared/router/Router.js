import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import JoinPage from "../../pages/join/JoinPage";
import IntroPage from "../../pages/intro/IntroPage";
import KakaoPage from "../../pages/kakao/KakaoPage";
import KakaoFriendsPage from "../../pages/kakao/KakaoFriendsPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/kakao" element={<KakaoPage />} />
        <Route path="/friends" element={<KakaoFriendsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
