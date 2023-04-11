import React from "react";
import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import JoinPage from "../../pages/JoinPage";
import HomePage from "../../pages/HomePage";
import KakaoPage from "../../pages/KakaoPage";
import IntroPage from "../../pages/IntroPage";
import SearchPage from "../../pages/SearchPage";
import NotFoundPage from "../../pages/NotFoundPage";
import OtherUserPage from "../../pages/OtherUserPage";
import FriendsListPage from "../../pages/FriendsListPage";
import KakaoFriendsPage from "../../pages/KakaoFriendsPage";
import FriendsDetailPage from "../../pages/FriendsDetailPage";

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
