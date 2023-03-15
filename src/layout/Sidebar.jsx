import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Sidebar() {
  // const URI = "http://daydei.s3-website.ap-northeast-2.amazonaws.com/friends";
  const URI = "http://localhost:3000/friends";
  const KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${URI}&response_type=code&scope=friends`;

  const friendKakao = () => {
    window.location.href = KAKAO;
  };

  const nickName = useSelector((state) => state.users.nickName);

  return (
    <SidebarWrapper>
      <NickNameContainer>
        <SideTitle>안녕하세요. {nickName}님</SideTitle>
      </NickNameContainer>
      <TodayScheduleContainer>
        <SideTitle>오늘의 일정</SideTitle>
        <TodayScheduleBox>
          <TodayBox>
            <span></span>
            <span></span>
          </TodayBox>
          <div>
            <span></span>
            <span></span>
          </div>
        </TodayScheduleBox>
      </TodayScheduleContainer>
      <FriendsListContainer>
        <SideTitle>친구 목록</SideTitle>
        <FriendsListBox>
          <ListBox>
            <img></img>
            <div>
              <span></span>
              <span></span>
            </div>
            <button>캘린더</button>
          </ListBox>
        </FriendsListBox>
      </FriendsListContainer>

      <button onClick={friendKakao}>카톡 친구 추가</button>
    </SidebarWrapper>
  );
}

export default Sidebar;

const SidebarWrapper = styled.div`
  background-color: ${(props) => props.theme.Bg.lightColor};
  min-width: 350px;
  height: 100%;
  padding: 52px 34px;
`;

const NickNameContainer = styled.section`
  background-color: coral;
  ${(props) => props.theme.FlexCol};
  margin-bottom: 58px;
`;

const TodayScheduleContainer = styled.section`
  ${(props) => props.theme.FlexCol};
  padding-bottom: 24px;
  border-bottom: 1px solid ${(props) => props.theme.Bg.borderColor};
  margin-bottom: 35px;
`;

const TodayScheduleBox = styled.div`
  background-color: #6ba16b;
  ${(props) => props.theme.FlexCol};
  justify-content: start;
  min-height: 270px;
  margin-top: 24px;
`;

const TodayBox = styled.div`
  background-color: #c2c2a3;
  ${(props) => props.theme.FlexRow};
  height: 50px;
`;

const FriendsListContainer = styled.div`
  ${(props) => props.theme.FlexCol};
`;
const FriendsListBox = styled(TodayScheduleBox)``;
const ListBox = styled(TodayBox)``;

const SideTitle = styled.section`
  font-size: ${(props) => props.theme.Fs.title};
  width: 100%;
  text-align: left;
`;
