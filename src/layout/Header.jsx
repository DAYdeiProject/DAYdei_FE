import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import { textState } from "../redux/modules/headerReducer";
import { __getHeaderProfile } from "../redux/modules/usersSlice";

import useOutSideClick from "../hooks/useOutsideClick";
import NotifiactionModalBox from "../components/NotifiactionModalBox";
import ProfileDetailModal from "../components/home/profile/ProfileDetailModal";
import ProfileSettingModal from "../components/home/profile/ProfileSettingModal";

import { ReactComponent as LogoIcon } from "../assets/main/logo.svg";
import { ReactComponent as AlertIcon } from "../assets/defaultIcons/alert.svg";
import defaultProfile from "../assets/defaultImage/profile.jpg";

import { GetUserInfo } from "../utils/cookie/userInfo";
import Alert from "../components/Alert";

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
  const [clickNav, setClickNav] = useState("");
  const dispatch = useDispatch();
  const userId = GetUserInfo();
  // 헤더 클릭한 값 state
  const { text } = useSelector((state) => state.header);
  const { headerProfile } = useSelector((state) => state.users);
  const { state } = useSelector((state) => state.alert);
  //console.log("alert state=========", state);

  // 헤더 프로필 이미지 가져오기
  useEffect(() => {
    setClickNav(text);
  }, [clickNav, text]);

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
    // localStorage.removeItem("userInfo");
    // Cookies.remove("accessJWTToken");

    // if (!Cookies.get("accessJWTToken")) {
    //   alert("로그아웃 되었습니다.");
    //   navigate("/");
    //   dispatch(textState("home"));
    // }

    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("userInfo");
      Cookies.remove("accessJWTToken");
      if (!Cookies.get("accessJWTToken")) {
        navigate("/");
        dispatch(textState("home"));
      }
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

  return (
    <>
      {!token && (
        <HeaderWrapper isToken={token}>
          <LogoContainer>
            <LogoIcon />
          </LogoContainer>
        </HeaderWrapper>
      )}
      {token && (
        <HeaderWrapper isToken={token}>
          <LogoContainer>
            <LogoIcon />
          </LogoContainer>
          <NavContainer>
            <NavTabConatiner isNav={clickNav}>
              <span className="homeSpan" onClick={homeClickHandler}>
                홈 캘린더
              </span>
              <span className="friendSpan" onClick={friendclickHandler}>
                친구/구독
              </span>
              <span className="searchSpan" onClick={searchClickHandler}>
                찾아보기
              </span>
            </NavTabConatiner>

            <IconWrapper ref={DropdownRef} className="notification">
              {isNotificationOpen && <NotifiactionModalBox isNotificationOpen={isNotificationOpen} setIsNotificationOpen={setIsNotificationOpen} />}
              <AlertIcon className="AlertIcon" onClick={notificationClick} />
              <ImageContainer onClick={handleDropdown}>
                <ImgBox>
                  <img src={headerProfile && headerProfile?.profileImage ? headerProfile.profileImage : defaultProfile} />
                </ImgBox>
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
              </ImageContainer>
            </IconWrapper>
          </NavContainer>
        </HeaderWrapper>
      )}

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

      {state && state.state && <Alert isComment={state.comment} />}
    </>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  max-width: 100%;
  height: 4rem;
  margin: 0 auto;
  border-bottom: 0.0313rem solid ${(props) => props.theme.Bg.color2};
  border-top: none;
  justify-content: ${(props) => !props.isToken && "left"};
`;

const LogoContainer = styled.section`
  ${(props) => props.theme.FlexRow};
  justify-content: left;
  width: 0;
  min-width: 21.875rem;
  max-width: 21.875rem;
  padding-left: 2.1875rem;
  span {
    text-align: left;
    font-size: ${(props) => props.theme.Fs.sizeLogo};
    text-align: center;
  }
`;

const NavContainer = styled.section`
  ${(props) => props.theme.FlexRow}
  height: 100%;
  padding: 2.125rem 3rem;
  span {
    ${(props) => props.theme.HeaderText};
    color: ${(props) => props.theme.Bg.fontColor3};
  }
`;

const NavTabConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  min-width: 1250px;
  width: 100%;
  gap: 2.5rem;
  span {
    :hover {
      cursor: pointer;
    }
  }
  .homeSpan {
    color: ${(props) => props.isNav === "home" && props.theme.Bg.fontBlack};
  }
  .friendSpan {
    color: ${(props) => props.isNav === "friend" && props.theme.Bg.fontBlack};
  }
  .searchSpan {
    color: ${(props) => props.isNav === "search" && props.theme.Bg.fontBlack};
  }
`;

const IconWrapper = styled.div`
  position: relative;
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  width: 9.375rem;
  height: 100%;
  display: flex;

  //align-items: center;
  .AlertIcon {
    :hover {
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;
const ImgBox = styled.div`
  ${(props) => props.theme.FlexCol};
  ${(props) => props.theme.BoxCustom};
  margin-left: 1.5rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  img {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
  }
`;

const DropdownFrame = styled.div`
  width: 15rem;
  height: 11.25rem;
  background: #ffffff;
  border: 0.0625rem solid #121212;
  box-shadow: 0rem 0rem 1.25rem rgba(78, 78, 78, 0.15), 0.0625rem 0.0625rem 0rem #000000;
  padding: 1rem 0.875rem;
  border-radius: 0.5rem;

  position: absolute;
  top: 2.5rem;
  right: 0rem;
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
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.875rem;
  /* background-color: yellow; */
`;

const GapArea = styled.div`
  width: 100%;
  height: 0.375rem;
  /* background-color: pink; */
  border-bottom: 0.0625rem solid ${(props) => props.theme.Bg.color3};
`;

const PhotoWrap = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePhoto = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  /* background-color: lightgray; */

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const IntroductionWrap = styled.div`
  height: 2.1875rem;
  width: 8.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.125rem;
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
  height: 7.1875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  /* background-color: lightgray; */
  margin-bottom: -10px;
`;

const Button = styled.div`
  height: 2.0625rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.Fs.size14};
  font-weight: 800;
  padding-left: 0.5rem;
  /* background-color: pink; */
  :hover {
    cursor: pointer;
  }
`;

const MessageBox = styled.div`
  position: absolute;
  bottom: 0rem;
  z-index: 500;
  right: 0;
  width: 18.75rem;
  height: 9.375rem;
  background-color: #ffffff;
  border: 0.0625rem solid black;
  padding: 1.25rem;
  transform: ${(props) => !props.isMessage && "transLateY(100%)"};
  transition: transform 0.5s;
`;
