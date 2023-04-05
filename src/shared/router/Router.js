import { BrowserRouter, Routes, Route, HashRouter, createBrowserRouter } from "react-router-dom";
import React from "react";
import HomePage from "../../pages/home/HomePage";
import JoinPage from "../../pages/join/JoinPage";
import IntroPage from "../../pages/intro/IntroPage";
import KakaoPage from "../../pages/kakao/KakaoPage";
import KakaoFriendsPage from "../../pages/kakao/KakaoFriendsPage";
import MyListPage from "../../pages/friendslist/MyListPage";
import SearchPage from "../../pages/search/SearchPage";
import FriendsDetailPage from "../../pages/friendsDetail/FriendsDetailPage";
import styled from "styled-components";
import NotFoundPage from "../../pages/NotFoundPage";
import Layout from "../../layout/Layout";
import App from "../../App";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
            path: "/mylist/:id",
            element: <MyListPage />,
          },
          {
            path: "/search/:id",
            element: <SearchPage />,
          },
          {
            path: "/friendsdetail:id",
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
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

export default Router;

const Wrapper = styled.div`
  min-width: 1920px;
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
`;

// function Router() {
//   return (
//     <BrowserRouter>
//       <Wrapper>
//         <Header />
//         <Routes>
//           <Route path="/" element={<IntroPage />} exact />
//           <Route path="/join" element={<JoinPage />} exact />
//           <Route path="/:id" element={<HomePage />} exact />
//           <Route path="/mylist/:id/" element={<MyListPage />} exact />
//           <Route path="/search/:id" element={<SearchPage />} exact />
//           <Route path="/friendsdetail/:id" element={<FriendsDetailPage />} exact />
//           <Route path="/kakao" element={<KakaoPage />} exact />
//           <Route path="/friends" element={<KakaoFriendsPage />} exact />
//           <Route path="/*" element={<NotFoundPage />} />
//         </Routes>
//       </Wrapper>
//     </BrowserRouter>
//   );
// }
