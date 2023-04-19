import Cookies from "js-cookie";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { React, useState, useEffect, useRef } from "react";

import { textState, otherIdState, newNotificationState } from "../redux/modules/headerReducer";
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
  // 알림창 오픈여부
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileSettingModalOpen, setIsProfileSettingModalOpen] = useState(false);
  //const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  // 프로필 수정시 최신정보 가져오기
  const [isEditProfile, setIsEditProfile] = useState(false);
  // 프로필 디테일 오픈여부
  const [isProfileDetail, setIsProfileDetail] = useState(false);

  const token = Cookies.get("accessJWTToken");
  const userId = GetUserInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 헤더 클릭한 값 state
  const { notiState } = useSelector((state) => state.header);
  const { headerProfile } = useSelector((state) => state.users);
  const { state } = useSelector((state) => state.alert);

  // url에 따른 header 변화
  let url = location.pathname.substr(1);

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
    if (window.confirm("로그아웃 하시겠습니까?")) {
      window.localStorage.clear();
      Cookies.remove("accessJWTToken");
      if (!Cookies.get("accessJWTToken")) {
        navigate("/");
        dispatch(textState("home"));
        dispatch(otherIdState(""));
      }
    }
  };

  // 알림 아이콘 클릭
  const notificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
    dispatch(newNotificationState(false));
  };

  // 홈클릭
  const homeClickHandler = () => {
    navigate(`/home`);
  };
  // 친구/구독
  const friendclickHandler = () => {
    navigate(`/mylist`);
  };
  // 찾아보기
  const searchClickHandler = () => {
    navigate(`/search`);
  };

  // 프로필 디테일 이동
  const moveProfileDetail = () => {
    setIsProfileDetail(!isProfileDetail);
  };

  // 로고 클릭시 home 이동
  const moveHomePage = () => {
    navigate("/home");
  };

  console.log("header0----", isProfileSettingModalOpen);
  return (
    <>
      {!token && (
        <HeaderWrapper isToken={token}>
          <LogoContainer>
            <LogoIcon className="introIcon" />
          </LogoContainer>
        </HeaderWrapper>
      )}
      {token && (
        <HeaderWrapper isToken={token}>
          <LogoContainer onClick={moveHomePage}>
            <LogoIcon className="homeIcon" />
          </LogoContainer>
          <NavContainer>
            <NavTabConatiner isNav={url}>
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
              <AlertContainer>
                <AlertIcon className="AlertIcon" onClick={notificationClick} />
                {notiState && <NewAlertIcon isNew={notiState}></NewAlertIcon>}
              </AlertContainer>
              <ImageContainer onClick={handleDropdown}>
                <ImgBox>
                  <img src={headerProfile && headerProfile?.profileImage ? headerProfile.profileImage : defaultProfile} alt="profile" />
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

      {state && state.state && <Alert isComment={state.comment} isMax={state.max} />}
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
  .homeIcon {
    cursor: pointer;
  }
  @media screen and (max-width: 1518px) {
    min-width: 8.7rem;
  }
`;

const NavContainer = styled.section`
  ${(props) => props.theme.FlexRow}
  height: 100%;
  padding: 2.125rem 3rem;
  span {
    ${(props) => props.theme.HeaderText};
    color: ${(props) => props.theme.Bg.color3};
  }
`;

const NavTabConatiner = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: left;
  min-width: 250px;
  gap: 2.5rem;
  span {
    font-size: ${(props) => props.theme.Fs.size20};
    :hover {
      cursor: pointer;
    }
  }
  .homeSpan {
    color: ${(props) => props.isNav === "home" && props.theme.Bg.color1};
  }
  .friendSpan {
    color: ${(props) => props.isNav === "mylist" && props.theme.Bg.color1};
  }
  .searchSpan {
    color: ${(props) => props.isNav === "search" && props.theme.Bg.color1};
  }

  @media screen and (max-width: 1518px) {
    padding-left: 50px;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  ${(props) => props.theme.FlexRow}
  justify-content: right;
  width: 9.375rem;
  height: 100%;
`;

const AlertContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  .AlertIcon {
    :hover {
      cursor: pointer;
    }
  }
`;

const NewAlertIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0.0625rem;
  display: ${(props) => (props.isNew ? "block" : "none")};
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.Bg.redColor};
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
`;

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileWrap = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.875rem;
  cursor: pointer;
  padding-left: 8px;
  border-radius: 4px;
  :hover {
    background-color: ${(props) => props.theme.Bg.hoverColor};
  }
`;

const GapArea = styled.div`
  width: 100%;
  height: 0.375rem;
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
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border: solid 1px #121212;
  box-shadow: 1px 1px 0 0 #000;
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
  margin-bottom: -10px;
`;

const Button = styled.div`
  height: 2.0625rem;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.Fs.size14};
  font-weight: 800;
  padding-left: 8px;
  border-radius: 4px;
  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.Bg.hoverColor};
  }
`;
