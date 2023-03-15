import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { __friendsList } from "../../redux/modules/kakaoSlice";
import Cookies from "js-cookie";

function KakaoFriendsPage() {
  const dispatch = useDispatch();
  const navi = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");
  const token = Cookies.get("accessJWTToken");

  const newData = {
    code,
    token,
  };

  useEffect(() => {
    dispatch(__friendsList(newData)).then((data) => {
      console.log("친구불러오기 성공~~ : ", data);
      navi(`/${data.payload.userId}`);
    });
  });

  return <div>KakaoFriendsPage</div>;
}

export default KakaoFriendsPage;
