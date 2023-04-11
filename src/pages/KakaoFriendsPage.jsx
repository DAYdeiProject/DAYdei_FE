import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __friendsList } from "../redux/modules/kakaoSlice";

function KakaoFriendsPage() {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");
  const token = Cookies.get("accessJWTToken");

  const newData = {
    code,
    token,
  };

  const URI = "https://daydei.life/kakao";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code`;

  useEffect(() => {
    dispatch(__friendsList(newData)).then(() => {
      // 친구 불러오기 성공 후 다시 로그인 하기
      // 리다이렉트 kakao로
      window.location.href = KAKAO;
    });
  });

  return <div></div>;
}

export default KakaoFriendsPage;
