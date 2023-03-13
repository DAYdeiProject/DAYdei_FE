import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");

  const [isEmailMessage, setIsEmailMessage] = useState("");
  const [isPwMessage, setIsPwMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (e.target.value === "") {
      setIsEmailMessage("");
      setIsEmail(false);
    } else if (!emailRegex.test(e.target.value)) {
      setIsEmailMessage("이메일 형식이 맞지 않습니다.");
      setIsEmail(false);
    } else {
      setIsEmailMessage("올바른 이메일 형식입니다.");
      setIsEmail(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    const pwRegex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/;

    if (e.target.value === "") {
      setIsPwMessage("");
      setIsPw(false);
    } else if (!pwRegex.test(e.target.value)) {
      setIsPwMessage("패스워드는 8자리-15자리로, 영어 소문자, 숫자, 특수문자의 조합이어야 합니다.");
      setIsPw(false);
    } else {
      setIsPwMessage("올바른 패스워드 형식입니다.");
      setIsPw(true);
    }
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setPasswordCheck("");
    setNickName("");
    setBirthday("");
  };

  return {
    email,
    isEmail,
    isEmailMessage,
    handleEmailChange,
    password,
    isPw,
    isPwMessage,
    handlePasswordChange,
    passwordCheck,
    handlePasswordCheckChange,
    nickName,
    handleNickNameChange,
    birthday,
    handleBirthdayChange,
    reset,
  };
};

export default useLogin;
