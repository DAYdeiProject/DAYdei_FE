import React from "react";
import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import JoinPage from "../../pages/JoinPage";
import IntroPage from "../../pages/IntroPage";
import SearchPage from "../../pages/SearchPage";
import HomePage from "../../pages/home/HomePage";
import KakaoPage from "../../pages/kakao/KakaoPage";
import OtherUserPage from "../../pages/OtherUserPage";
import FriendsListPage from "../../pages/FriendsListPage";
import NotFoundPage from "../../pages/notFound/NotFoundPage";
import FriendsDetailPage from "../../pages/FriendsDetailPage";
import KakaoFriendsPage from "../../pages/kakao/KakaoFriendsPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <IntroPage />,
          },
          {
            path: "/join",
            element: <JoinPage />,
          },
          {
            path: "/home",
            element: <HomePage />,
          },
          {
            path: "/mylist",
            element: <FriendsListPage />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/other",
            element: <OtherUserPage />,
          },
          {
            path: "/friendsdetail",
            element: <FriendsDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/kakao",
    element: <KakaoPage />,
  },
  {
    path: "/friends",
    element: <KakaoFriendsPage />,
  },
]);

export default Router;
