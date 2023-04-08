import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [introduction, setIntroduction] = useState("");

  const [isEmailMessage, setIsEmailMessage] = useState("");
  const [isPwMessage, setIsPwMessage] = useState("");
  const [isPwCheckMessage, setIsPwCheckMessage] = useState("");
  const [isNickNameMessage, setIsNickNameMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [isNickname, setIsNickName] = useState(false);
  const [nicknameRegex, setNicknameRegex] = useState(false);

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
      setIsPwMessage("패스워드는 영어 소문자, 숫자, 특수문자 조합의 8-15자리여야 합니다.");
      setIsPw(false);
    } else {
      setIsPwMessage("올바른 패스워드 형식입니다.");
      setIsPw(true);
    }
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);

    if (password === "") {
      setIsPwCheckMessage("패스워드를 먼저 입력해주세요.");
      setIsPwCheck(false);
    } else if (e.target.value === "") {
      setIsPwCheckMessage("");
      setIsPwCheck(false);
    } else if (password === e.target.value) {
      setIsPwCheckMessage("비밀번호와 일치합니다.");
      setIsPwCheck(true);
    } else {
      setIsPwCheckMessage("비밀번호가 일치하지 않습니다");
      setIsPwCheck(false);
    }

    if (password === "" && e.target.value === "") {
      setIsPwCheckMessage("");
    }
  };

  function handleNickNameChange(e) {
    const inputValue = e.target.value;
    setNickName(inputValue);
    setNicknameRegex(validateInput(inputValue));
  }

  function validateInput(input) {
    const koreanAndEnglishOnly = /^([ㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9]{1,6}|[a-zA-Z0-9]{1,8})$/;
    //const newss = /^(?:[\uAC00-\uD7AF]{1,6}|[\w\uAC00-\uD7AF]{1,8})$/;
    return koreanAndEnglishOnly.test(input);
  }

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
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
    isPwCheckMessage,
    handlePasswordChange,
    passwordCheck,
    handlePasswordCheckChange,
    nickName,
    handleNickNameChange,
    isNickNameMessage,
    birthday,
    handleBirthdayChange,
    introduction,
    handleIntroductionChange,
    reset,
    nicknameRegex,
    validateInput,
  };
};

export default useLogin;
