import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import useOutSideClick from "../hooks/useOutsideClick";
import ProfileSettingModal from "../pages/home/profile/ProfileSettingModal";
import { ReactComponent as LogoIcon } from "../assets/main/logo.svg";
import { ReactComponent as Alert } from "../assets/defaultIcons/alert.svg";
import defaultProfile from "../assets/defaultImage/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { __getHeaderProfile } from "../redux/modules/usersSlice";
import { GetUserInfo } from "../utils/cookie/userInfo";
import ProfileDetailModal from "../pages/home/profile/ProfileDetailModal";
import NotifiactionModalBox from "../components/NotifiactionModalBox";
import { textState } from "../redux/modules/headerReducer";
import { EventSourcePolyfill } from "event-source-polyfill";
import Loading from "../components/Loading";

const EventSource = EventSourcePolyfill;

function Header() {
  const navigate = useNavigate();

  // 알림창 오픈여부
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileSettingModalOpen, setIsProfileSettingModalOpen] = useState(false);
  // 프로필 수정시 최신정보 가져오기
  const [isEditProfile, setIsEditProfile] = useState(false);
  // 프로필 디테일 오픈여부
  const [isProfileDetail, setIsProfileDetail] = useState(false);
  const token = Cookies.get("accessJWTToken");
  const [clickNav, setClickNav] = useState("home");
  const dispatch = useDispatch();
  const userId = GetUserInfo();

  // 헤더 클릭한 값 state
  const { data } = useSelector((state) => state.header);

  const { headerProfile, isLoading } = useSelector((state) => state.users);
  //console.log(headerProfile);

  // 헤더 프로필 이미지 가져오기
  useEffect(() => {
    setClickNav(data);
  }, [clickNav, data]);

  useEffect(() => {
    // 프로필 수정시에도 get요청 다시하기
    if (userId) {
      dispatch(__getHeaderProfile(userId.userId));
    }
  }, [isEditProfile, token, isDropdownOpen]);

  // 드롭다운 열고닫힘 관리 함수
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationOpen(false);
  };
  // 드롭다운 닫힘 함수 (바깥 영역 눌렀을 때 닫히게 할 때 씀)
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
    setIsNotificationOpen(false);
  };

  const DropdownRef = useRef(null);
  useOutSideClick(DropdownRef, handleDropdownClose);

  const ProfileSettingModalHandler = () => {
    setIsDropdownOpen(false);
    setIsProfileSettingModalOpen(true);
  };

  const [userInfo, setUserInfo] = useState({ nickName: "", email: "" });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [headerProfile]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    Cookies.remove("accessJWTToken");

    if (!Cookies.get("accessJWTToken")) {
      alert("로그아웃 되었습니다.");
      navigate("/");
      dispatch(textState("home"));
    }
  };
  // 알림 클릭
  const notificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };

  // 홈클릭
  const homeClickHandler = () => {
    dispatch(textState("home")); // 색깔 진하게
    navigate(`/${userId.userId}`);
  };
  // 친구/구독
  const friendclickHandler = () => {
    dispatch(textState("friend"));
    navigate(`/mylist/${userId.userId}`);
  };
  // 찾아보기
  const searchClickHandler = () => {
    dispatch(textState("search"));
    navigate(`/search/${userId.userId}`);
  };

  // 프로필 디테일 이동
  const moveProfileDetail = () => {
    setIsProfileDetail(!isProfileDetail);
  };

  // SSE 알림
  //  "Content-Type": "text/event-stream",
  //     Connection: "keep-alive",
  useEffect(() => {
    const eventConnect = new EventSource(`https://sparta-daln.shop/api/connect`, {
      headers: {
        Authorization: token,
      },
      heartbeatTimeout: 45000,
    });

    eventConnect.onmessage = (event) => {
      const result = event.data;
      console.log("connect ==> ", result);

      if (!result.includes("EventStream")) {
        console.log("message===>", result.content);
        //setSseData(result);
        //setIsMessageState(true);
      }
    };
    return () => eventConnect.close();
  }, []);

  // 실시간 알림창
  // useEffect(() => {
  //   let timer;
  //   if (isMessageState) {
  //     timer = setTimeout(() => {
  //       setIsMessageState(false);
  //     }, 3000); // 4초 후 모달이 자동으로 닫힘
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [isMessageState]);

  return (
    <>
      <HeaderWrapper isToken={token}>
        <LogoContainer>
          <LogoIcon />
        </LogoContainer>
        {token && (
          <NavContainer>
            <NavTabConatiner isNav={clickNav}>
              <div onClick={homeClickHandler}>
                <span className="homeSpan">홈 캘린더</span>
              </div>
              <div onClick={friendclickHandler}>
                <span className="friendSpan">친구/구독</span>
              </div>
              <div onClick={searchClickHandler}>
                <span className="searchSpan">찾아보기</span>
              </div>
            </NavTabConatiner>
            <NavUserConatiner>
              <IconWrapper ref={DropdownRef} className="notification">
                {isNotificationOpen && <NotifiactionModalBox isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />}
                <Alert onClick={notificationClick} />
                <Image onClick={handleDropdown}>
                  <img src={headerProfile && headerProfile?.profileImage ? headerProfile.profileImage : defaultProfile} />
                  {isDropdownOpen && (
                    <DropdownFrame>
                      <ContentWrapper>
                        <ProfileWrap onClick={moveProfileDetail}>
                          <PhotoWrap>
                            <ProfilePhoto src={headerProfile && headerProfile?.profileImage ? headerProfile.profileImage : defaultProfile} />
                          </PhotoWrap>
                          <IntroductionWrap>
                            <NameWrap>{headerProfile.nickName} </NameWrap>
                            <EmailWrap>@{headerProfile.email.split("@")[0]}</EmailWrap>
                          </IntroductionWrap>
                        </ProfileWrap>
                        <GapArea></GapArea>
                        <Options>
                          <Button onClick={ProfileSettingModalHandler}>
                            <div>프로필 수정</div>
                          </Button>
                          <Button onClick={logoutHandler}>
                            <div>로그아웃</div>
                          </Button>
                        </Options>
                      </ContentWrapper>
                    </DropdownFrame>
                  )}
                </Image>
              </IconWrapper>
            </NavUserConatiner>
          </NavContainer>
        )}
      </HeaderWrapper>
      {isProfileSettingModalOpen && (
        <ProfileSettingModal
          isProfileSettingModalOpen={isProfileSettingModalOpen}
          setIsProfileSettingModalOpen={setIsProfileSettingModalOpen}
          isEditProfile={isEditProfile}
          setIsEditProfile={setIsEditProfile}
        />
      )}
      <ProfileDetailModal
        isProfileDetail={isProfileDetail}
        setIsProfileDetail={setIsProfileDetail}
        setIsProfileSettingModalOpen={setIsProfileSettingModalOpen}
      />
    </>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  ${(props) => props.theme.FlexRow}
  width: 100%;
  height: 64px;
  margin: 0 auto;
  //border: 0.5px solid ${(props) => props.theme.Bg.color3};
  border-bottom: 0.5px solid ${(props) => props.theme.Bg.color2};
  border-top: none;
  justify-content: ${(props) => !props.isToken && "left"};
`;

const LogoContainer = styled.section`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  width: 0;
  min-width: 350px;
  padding-left: 35px;
  span {
    text-align: left;
    font-size: ${(props) => props.theme.Fs.sizeLogo};
    text-align: center;
  }
`;

const NavContainer = styled.section`
  ${(props) => props.theme.FlexRowBetween}
  width: 1570px;
  padding: 34px 48px;
  span {
    ${(props) => props.theme.HeaderText};
    color: ${(props) => props.theme.Bg.fontColor3};
  }
`;

const NavTabConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  gap: 40px;
  .homeSpan {
    color: ${(props) => props.isNav === "home" && props.theme.Bg.fontBlack};
  }
  .friendSpan {
    color: ${(props) => props.isNav === "friend" && props.theme.Bg.fontBlack};
  }
  .searchSpan {
    color: ${(props) => props.isNav === "search" && props.theme.Bg.fontBlack};
  }
  :hover {
    cursor: pointer;
  }
`;

const NavUserConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  gap: 40px;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  ${(props) => props.theme.BoxCustom};
  margin-left: 24px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;

const DropdownFrame = styled.div`
  width: 240px;
  height: 180px;
  background: #ffffff;
  border: 1px solid #121212;
  box-shadow: 0px 0px 20px rgba(78, 78, 78, 0.15), 1px 1px 0px #000000;
  padding: 16px 14px;
  border-radius: 8px;

  position: relative;
  top: 3px;
  right: 200px;
  z-index: 100;
  /* background-color: pink; */
`;

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  /* background-color: pink; */
`;

const ProfileWrap = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  /* background-color: yellow; */
`;

const GapArea = styled.div`
  width: 100%;
  height: 6px;
  /* background-color: pink; */
  border-bottom: 1px solid ${(props) => props.theme.Bg.color3};
`;

const PhotoWrap = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  /* background-color: lightgray; */

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const IntroductionWrap = styled.div`
  height: 35px;
  width: 142px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

const NameWrap = styled.div`
  font-size: ${(props) => props.theme.Fs.size16};
`;

const EmailWrap = styled.div`
  font-size: ${(props) => props.theme.Fs.size12};
  color: ${(props) => props.theme.Bg.color3};
`;

const Options = styled.div`
  width: 100%;
  height: 115px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  /* background-color: lightgray; */
  margin-bottom: -10px;
`;

const Button = styled.div`
  height: 33px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.Fs.size14};
  font-weight: 800;
  padding-left: 8px;
  /* background-color: pink; */
  :hover {
    cursor: pointer;
  }
`;

const MessageBox = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 500;
  right: 0;
  width: 300px;
  height: 150px;
  background-color: #ffffff;
  border: 1px solid black;
  padding: 20px;
  transform: ${(props) => !props.isMessage && "transLateY(100%)"};
  transition: transform 0.5s;
`;
