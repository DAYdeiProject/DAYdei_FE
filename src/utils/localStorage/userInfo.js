function UserInfo() {
  const localUserInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(localUserInfo);

  return userInfo;
}
export default UserInfo;
