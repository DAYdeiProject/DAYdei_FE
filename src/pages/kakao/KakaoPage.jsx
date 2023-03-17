import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { __kakaoLogin } from "../../redux/modules/kakaoSlice";

function KakaoPage() {
  const dispatch = useDispatch();
  const navi = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(__kakaoLogin(code)).then((data) => {
      console.log("카톡 로그인 성공", data);
      navi(`/${data.payload.userId}`);
    });
  });

  return <div>KakaoPage</div>;
}

export default KakaoPage;
