import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { __getMyProfile } from "../../redux/modules/usersSlice";

// 로컬스토리지 userId 설정
function SetUserInfo(token, id) {
  // 토큰 설정
  const expiryDate = new Date(Date.now() + 3 * 60 * 60 * 1000);
  Cookies.set("accessJWTToken", token, { expires: expiryDate });

  // userId 설정
  const userInfo = {
    userId: id,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  return null;
}
export default SetUserInfo;

// 로컬스토리지 userId 가져오기
export function GetUserInfo() {
  const localUserInfo = localStorage.getItem("userInfo");
  let userInfo = "";
  if (localUserInfo) {
    userInfo = JSON.parse(localUserInfo);
  }

  return userInfo;
}

// parma id의 유저 있는지 확인
export function UserCheck(id) {
  const dispatch = useDispatch();
  let result = "";

  dispatch(__getMyProfile(id)).then((data) => {
    console.log("함수에서~~~~", data);
  });
}
