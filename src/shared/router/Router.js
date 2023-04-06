import React from "react";
import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import IntroPage from "../../pages/intro/IntroPage";
import JoinPage from "../../pages/join/JoinPage";
import HomePage from "../../pages/home/HomePage";
import MyListPage from "../../pages/friendslist/MyListPage";
import SearchPage from "../../pages/search/SearchPage";
import FriendsDetailPage from "../../pages/friendsDetail/FriendsDetailPage";
import KakaoPage from "../../pages/kakao/KakaoPage";
import KakaoFriendsPage from "../../pages/kakao/KakaoFriendsPage";
import NotFoundPage from "../../pages/notFound/NotFoundPage";
import Layout from "../../layout/Layout";

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
            path: "/:id",
            element: <HomePage />,
          },
          {
            path: "/*",
            element: <NotFoundPage />,
          },
          {
            path: "/mylist/:id",
            element: <MyListPage />,
          },
          {
            path: "/mylist/*",
            element: <NotFoundPage />,
          },
          {
            path: "/search/:id",
            element: <SearchPage />,
          },
          {
            path: "/search/*",
            element: <NotFoundPage />,
          },
          {
            path: "/friendsdetail/:id",
            element: <FriendsDetailPage />,
          },
          {
            path: "/friendsdetail/*",
            element: <NotFoundPage />,
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
