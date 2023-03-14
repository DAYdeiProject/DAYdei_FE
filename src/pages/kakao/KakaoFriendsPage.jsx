import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { __friendsList } from "../../redux/modules/kakaoSlice";

function KakaoFriendsPage() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(__friendsList(code)).then((data) => {
      console.log(data);
      navi("/home");
    });
  });

  return <div>KakaoFriendsPage</div>;
}

export default KakaoFriendsPage;
