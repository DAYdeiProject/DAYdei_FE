import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TokenCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = !!Cookies.get("accessJWTToken");

  //로그인 페이지와 회원가입 페이지에서는 해당 훅이 발동하지 않도록
  const isLoginPage = location.pathname === "/";
  const isJoinPage = location.pathname === "/join";

  useEffect(() => {
    if (!isLoginPage && !isJoinPage && !getToken) {
      localStorage.removeItem("userInfo");
      alert("유저 정보가 유효하지 않습니다. 로그인 해주세요");
      //navigate("/");
      window.location.replace(`/`);
    }
  }, [isLoginPage, isJoinPage, getToken]);

  return null;
}
export default TokenCheck;
