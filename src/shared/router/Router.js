import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import JoinPage from "../../pages/join/JoinPage";
import IntroPage from "../../pages/intro/IntroPage";
import KakaoPage from "../../pages/kakao/KakaoPage";
import KakaoFriendsPage from "../../pages/kakao/KakaoFriendsPage";
import Header from "../../layout/Header";
import MyListPage from "../../pages/friendslist/MyListPage";
import SearchPage from "../../pages/search/SearchPage";
import FriendsDetailPage from "../../pages/friendsDetail/FriendsDetailPage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/:id" element={<HomePage />} />
        <Route path="/mylist/:id/" element={<MyListPage />} />
        <Route path="/search/:id" element={<SearchPage />} />
        <Route path="/friendsdetail/:id" element={<FriendsDetailPage />} />

        <Route path="/kakao" element={<KakaoPage />} />
        <Route path="/friends" element={<KakaoFriendsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
