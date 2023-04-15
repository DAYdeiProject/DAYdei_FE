import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { __getMyProfile } from "../../redux/modules/usersSlice";
import { decrypt, encrypt } from "./encryption";

// 로컬스토리지 userId 설정
function SetUserInfo(token, id) {
  const secretKey = `${process.env.REACT_APP_LOCAL_SECRETKEY}`;
  // 토큰 설정
  const expiryDate = new Date(Date.now() + 6 * 60 * 60 * 1000);
  Cookies.set("accessJWTToken", token, { expires: expiryDate });

  // userId 설정
  const userInfo = {
    userId: String(id),
  };

  // userId 암호화
  if (id) {
    const encryptUser = encrypt(userInfo);
    localStorage.setItem(secretKey, encryptUser);
  }

  return null;
}
export default SetUserInfo;

// 로컬스토리지 userId 가져오기
export function GetUserInfo() {
  const secretKey = `${process.env.REACT_APP_LOCAL_SECRETKEY}`;
  const localUserInfo = localStorage.getItem(secretKey);

  if (localUserInfo) {
    try {
      const result = decrypt(localUserInfo);
      return result;
    } catch (error) {
      return null;
    }
  }
}

// parma id의 유저 있는지 확인
// export function UserCheck(id) {
//   const dispatch = useDispatch();
//   let result = "";
// }
