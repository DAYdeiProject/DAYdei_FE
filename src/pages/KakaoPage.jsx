import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __kakaoLogin } from "../redux/modules/kakaoSlice";

function KakaoPage() {
  const dispatch = useDispatch();
  const navi = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(__kakaoLogin(code)).then((data) => {
      if (data.payload.userId) {
        navi(`/home`);
      } else {
        navi("/kakaoerror");
      }
    });
  });

  return <div></div>;
}

export default KakaoPage;
