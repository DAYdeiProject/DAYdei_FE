import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setComment } from "../../redux/modules/notFoundReducer";

function TokenCheck() {
  //const isLogin = () => !!Cookies.get("accessJWTToken");
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = !!Cookies.get("accessJWTToken");
  const dispatch = useDispatch();

  //로그인 페이지와 회원가입 페이지에서는 해당 훅이 발동하지 않도록
  const isLoginPage = location.pathname === "/";
  const isJoinPage = location.pathname === "/join";

  useEffect(() => {
    if (!isLoginPage && !isJoinPage && !getToken) {
      localStorage.removeItem("userInfo");
      alert("로그인 시간이 만료되었습니다. 다시 로그인 해주세요");
      navigate("/");
    }
  }, [isLoginPage, isJoinPage, getToken, location.pathname, navigate]);

  return null;
}
export default TokenCheck;

// 사용 방법
// import TokenCheck from '../modules/util/TokenCheck';
// TokenCheck();
