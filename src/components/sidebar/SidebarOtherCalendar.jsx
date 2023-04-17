import Cookies from "js-cookie";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { __getOtherUser } from "../../redux/modules/calendarSlice";
import { __addSubscribe, __cancelSubscribe } from "../../redux/modules/subscribeSlice";
import { __requestFriend, __cancelRequest, __acceptNewFriend } from "../../redux/modules/friendsSlice";
import defaultProfile from "../../assets/defaultImage/profile.jpg";

export default function SidebarOtherCalendar({ otherId }) {
  const dispatch = useDispatch();
  const token = Cookies.get("accessJWTToken");
  //친구 관계, 구독상태에 따라 변하는 버튼 텍스트의 상태
  const [buttonText, setButtonText] = useState("");
  const [subscribeButtontext, setSubscribeButtonText] = useState("");
  //통신이 잘 되었음을 알려주는 statusCode -> useEffect의 의존성배열로 사용
  const statusCodeFriend = useSelector((state) => state.friends.statusCode);
  const statusCodeSubscribe = useSelector((state) => state.subscribe.statusCode);
  const acceptStatusCode = useSelector((state) => state.friends.acceptStatusCode);
  const navigate = useNavigate();
  const { otherUser } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(__getOtherUser({ userId: otherId, token }));
  }, [otherId, statusCodeFriend, statusCodeSubscribe, acceptStatusCode]);

  // 친구신청요청, 요청 취소
  const debounceRequestHandler = debounce((id) => {
    dispatch(__requestFriend(id));
  }, 300);

  const debounceCancelRequestHandler = debounce((id) => {
    dispatch(__cancelRequest(id));
  }, 300);

  //구독하기, 구독취소
  const debounceSubscribeHandler = debounce((id) => {
    dispatch(__addSubscribe(id));
  }, 300);

  const debounceCancelSubscribeHandler = debounce((id) => {
    dispatch(__cancelSubscribe(id));
  }, 300);

  //친구 신청 승인
  const ApproveRequestHandler = (id) => {
    dispatch(__acceptNewFriend(id));
  };

  //친구 버튼을 눌렀을 때 호출되는 함수 (현재 친구관계를 추적하여 그에 맞는 요청을 보낸다)
  const handleFriendButtonClick = async (user) => {
    if (user.friendCheck === false && user.isRequestFriend === null) {
      debounceRequestHandler(user.id);
    } else if ((user.friendCheck === false && user.isRequestFriend === false) || (user.friendCheck === true && user.isRequestFriend === null)) {
      debounceCancelRequestHandler(user.id);
    } else if (user.friendCheck === false && user.isRequestFriend === true) {
      ApproveRequestHandler(user.id);
    }
  };

  //구독 버튼을 눌렀을 때 호출되는 함수 (현재 구독상태를 추적하여 그에 맞는 요청을 보낸다)
  const handleSubscribeButtonClick = async (user) => {
    if (user.userSubscribeCheck === false) {
      debounceSubscribeHandler(user.id);
    } else {
      debounceCancelSubscribeHandler(user.id);
    }
  };

  //처음 상대방 프로필 진입 시 친구 관계/ 구독상태에 따라 버튼 텍스트를 다르게 세팅
  useEffect(() => {
    if (otherUser.friendCheck === false && otherUser.isRequestFriend === null) {
      setButtonText("친구신청");
    } else if (otherUser.friendCheck === false && otherUser.isRequestFriend === false) {
      setButtonText("친구신청 취소");
    } else if (otherUser.friendCheck === false && otherUser.isRequestFriend === true) {
      setButtonText("신청 승인");
    } else if (otherUser.friendCheck === true && otherUser.isRequestFriend === null) {
      setButtonText("친구");
    }

    otherUser.userSubscribeCheck === false ? setSubscribeButtonText("구독하기") : setSubscribeButtonText("구독취소");
  }, [otherUser]);

  const ShowFriendDetailHandler = () => {
    navigate(`/friendsdetail`);
  };

  return (
    <>
      {otherUser.id && (
        <ProfileWrapper>
          <BackImgWrapper isCover={otherUser?.backgroundImage}>
            {otherUser?.backgroundImage && <img src={otherUser?.backgroundImage} alt="background" />}
          </BackImgWrapper>
          <ImgWrapper>
            <img src={otherUser?.profileImage ? otherUser.profileImage : defaultProfile} alt="profile" />
          </ImgWrapper>
          <NickNameBox>{otherUser?.nickName}</NickNameBox>
          <EmailBox>@{otherUser?.email && otherUser.email.split("@")[0]}</EmailBox>
          <CountBox onClick={buttonText === "친구" ? ShowFriendDetailHandler : () => alert("친구만 열람 가능합니다.")}>
            <div>
              <span>친구 {otherUser?.friendCount}명</span>
              <span>구독 {otherUser?.subscribingCount}명</span>
              <span>구독자 {otherUser?.subscriberCount}명</span>
            </div>
          </CountBox>
          <TextareaBox>{otherUser?.introduction ? otherUser.introduction : `${otherUser.nickName}의 캘린더입니다.`}</TextareaBox>
          <ButtonBox>
            <div onClick={() => handleFriendButtonClick(otherUser)}>
              {otherUser?.friendCheck === false && otherUser?.isRequestFriend === null
                ? "친구신청"
                : otherUser?.friendCheck === false && otherUser?.isRequestFriend === false
                ? "친구신청 취소"
                : otherUser?.friendCheck === false && otherUser?.isRequestFriend === true
                ? "신청 승인"
                : otherUser?.friendCheck === true && otherUser?.isRequestFriend === null
                ? "친구 끊기"
                : null}
            </div>
            <div onClick={() => handleSubscribeButtonClick(otherUser)}>{otherUser.userSubscribeCheck === false ? "구독하기" : "구독취소"}</div>
          </ButtonBox>
          <TogetherWrapper>
            {otherUser?.mutualFriendsCount !== 0 && (
              <div>
                <span>함께 아는 친구 {otherUser?.mutualFriendsCount}</span>
              </div>
            )}
          </TogetherWrapper>
        </ProfileWrapper>
      )}
    </>
  );
}

const ProfileWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  justify-content: flex-start;
  background-color: #ffffff;
  height: 100%;
  border-right: 0.0625rem solid ${(props) => props.theme.Bg.color2};
`;

const BackImgWrapper = styled.div`
  background-color: ${(props) => (props.isCover ? "#ffffff" : props.theme.Bg.mainColor3)};
  width: 100%;
  height: 430px;
  border: none;
  background-size: cover;

  @media screen and (max-height: 970px) {
    height: 350px;
  }
  @media screen and (max-height: 860px) {
    height: 320px;
  }
  @media screen and (max-height: 772px) {
    height: 280px;
  }

  img {
    width: 100%;
    height: 430px;
    border: none;

    @media screen and (max-height: 970px) {
      height: 350px;
    }
    @media screen and (max-height: 860px) {
      height: 320px;
    }
    @media screen and (max-height: 772px) {
      height: 280px;
    }
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 360px;
  ${(props) => props.theme.FlexCol}
  margin-bottom: 1.25rem;

  @media screen and (max-height: 970px) {
    top: 275px;
  }
  @media screen and (max-height: 885px) {
    top: 282px;
  }
  @media screen and (max-height: 860px) {
    top: 258px;
  }
  @media screen and (max-height: 772px) {
    top: 222px;
  }

  img {
    ${(props) => props.theme.BoxCustom};
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: fixed;
    cursor: auto;

    @media screen and (max-height: 885px) {
      width: 125px;
      height: 125px;
    }
    @media screen and (max-height: 860px) {
      width: 115px;
      height: 115px;
    }
    @media screen and (max-height: 772px) {
      width: 105px;
      height: 105px;
    }
  }
`;

const NickNameBox = styled.span`
  padding-top: 110px;
  margin-bottom: 0.625rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.Bg.color1};

  @media screen and (max-height: 885px) {
    padding-top: 85px;
  }
  @media screen and (max-height: 860px) {
    padding-top: 70px;
    font-size: 1.4rem;
  }
  @media screen and (max-height: 772px) {
    padding-top: 65px;
  }
`;

const EmailBox = styled.span`
  margin-bottom: 1.25rem;
  ${(props) => props.theme.DescriptionText};
  font-size: 0.875rem;
`;

const CountBox = styled.div`
  ${(props) => props.theme.FlexCol}
  padding: 0 2rem;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  color: ${(props) => props.theme.Bg.color1};
  div {
    ${(props) => props.theme.FlexRowBetween}
    padding: 0 1.25rem;
    padding-bottom: 0.625rem;
    border-bottom: 0.0625rem solid ${(props) => props.theme.Bg.color3};
  }
  :hover {
    cursor: pointer;
  }

  @media screen and (max-height: 772px) {
    margin-bottom: 10px;
  }
`;
const TextareaBox = styled.div`
  width: 100%;
  height: 6.25rem;
  text-align: center;
  padding: 0.3125rem 5rem;
  ${(props) => props.theme.DescriptionText};
  font-size: 0.875rem;
  white-space: pre-wrap;

  @media screen and (max-height: 860px) {
    height: 70px;
  }
  @media screen and (max-height: 772px) {
    height: 55px;
  }
`;

const ButtonBox = styled.div`
  ${(props) => props.theme.FlexRow}
  display: flex;
  gap: 0.625rem;
  margin: 0 2.5rem;
  margin-top: 1.25rem;
  font-size: 0.875rem;

  @media screen and (max-height: 772px) {
    margin-top: 10px;
  }
  div {
    ${(props) => props.theme.FlexCol}
    ${(props) => props.theme.ButtonMedium};
    width: 8.125rem;
    height: 3rem;
    color: ${(props) => props.theme.Bg.color1};

    @media screen and (max-height: 860px) {
      height: 42px;
    }
    @media screen and (max-height: 772px) {
      height: 38px;
    }
  }
  div:nth-child(1) {
    background-color: ${(props) => props.theme.Bg.mainColor5};
    color: #ffffff;
  }
  div:nth-child(2) {
    ${(props) => props.theme.BtnClickYellow};
  }
`;

const TogetherWrapper = styled.div`
  width: 100%;
  padding: 0 2.5rem;
  margin-top: 1.25rem;
  ${(props) => props.theme.DescriptionText};
  div {
    ${(props) => props.theme.FlexCol};
    background-color: ${(props) => props.theme.Bg.color4};
    width: 100%;
    height: 1.5rem;
    border-radius: 0.25rem;
  }
`;
