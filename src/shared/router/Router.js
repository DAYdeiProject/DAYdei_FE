import React from "react";
import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../../layout/Layout";
import HomePage from "../../pages/home/HomePage";
import JoinPage from "../../pages/JoinPage";
import KakaoPage from "../../pages/kakao/KakaoPage";
import IntroPage from "../../pages/IntroPage";
import SearchPage from "../../pages/SearchPage";
import FriendsListPage from "../../pages/FriendsListPage";
import NotFoundPage from "../../pages/notFound/NotFoundPage";
import KakaoFriendsPage from "../../pages/kakao/KakaoFriendsPage";
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
            path: "/:id",
            element: <HomePage />,
          },
          {
            path: "/*",
            element: <NotFoundPage />,
          },
          {
            path: "/mylist/:id",
            element: <FriendsListPage />,
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
